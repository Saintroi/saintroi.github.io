let projectData = {
    "projectCode": `
import ms from 'ms';
import procore from '../integrations/procore';

const projectApi = {};

/**
 * Retrives a specific project from the Procore API
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
projectApi.getOne = (async (_, args) => {
  const project = await procore.instance.get({
    url: '/projects/{id}',
    params: args,
  });

  return project;
});

/**
 * Retrives a list of all projects from the Procore API
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
projectApi.getAll = (async () => {
  // Procore doesn't fetch all fields when fetching a list of projects
  // need to fetch the base project and fetch projects individually to have everything
  const baseProjects = await procore.instance.get({ url: '/projects' });
  const projects = await Promise.all(baseProjects.map((project) => {
    return projectApi.getOne(null, { id: project.id.toString() });
  }));

  return projects;
});

/**
 * Retrives a list of all projects w/ a green flag in Procore
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
projectApi.getActive = (async () => {
  const projects = await projectApi.getAll();
  return projects.filter(project => project.flag === 'Green');
});

/**
 * Retrives a list of all projects for a particular user
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
projectApi.getForUser = (async (_, args, context) => {
  const projects = await projectApi.getAll();
  const permissions = await projectApi.getUserMap();

  if (!permissions[context.user.email]) return [];

  return projects.filter((project) => {
    return permissions[context.user.email].indexOf(project.id) !== -1;
  });
});

/**
 * Retrives the users assigned to a particular project in Procore
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
projectApi.getUsers = (async (_, args) => {
  const users = await procore.instance.get({
    url: '/projects/{projectId}/users',
    params: args,
  });

  return users;
});

/**
 * Gets a map of users containing the projects they have access to
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
projectApi.getUserMap = (async (_, args) => {
  const permissionMap = {};
  const projects = await projectApi.getAll();
  const userGroups = await Promise.all(projects.map((project) => {
    return projectApi.getUsers(null, { projectId: project.id });
  }));

  userGroups.forEach((userGroup, i) => {
    const projectId = projects[i].id;
    userGroup.forEach((user) => {
      const email = user.emailAddress;
      if (!permissionMap[email]) permissionMap[email] = [];
      permissionMap[email].push(projectId);
    });
  });

  return permissionMap;
});

projectApi.cache = {
  getOne: { key: 'project', ttl: ms('6m') },
  getActive: { key: 'projects', ttl: ms('6m') },
  getForUser: { key: 'user-projects', ttl: ms('2m'), byUser: true },
};

export default projectApi;
    `,
"budgetCode": `import ms from 'ms';
import procore from '../integrations/procore';
import railway from '../integrations/railway';
import models from '../models';
import queue from '../kue';
import redis from '../database/redis';

const budgetApi = {};

/**
 * Fetches a Procore budget object for a particular projectId
 * @param {Object} _
 * @param {Object} args
 */
budgetApi.get = (async (_, args) => {
  const budget = await procore.instance.get({
    url: '/projects/{projectId}/budget',
    params: args,
  });

  budget.projectId = args.projectId;
  budget.projectNumber = args.projectNumber;

  process.nextTick(() => {
    budgetApi.getProjectTransactions(null, { projectId: args.projectNumber });
  });

  return budget;
});

/**
 * Gets the budget line items for a project from Procore
 * @param {Object} _
 * @param {Object} args
 */
budgetApi.getLineItems = (async (_, args) => {
  const rows = await procore.instance.get({
    url: '/budget_views/1887/detail_rows',
    params: args,
  });

  rows.forEach((row) => {
    row.projectNumber = args.projectNumber; // eslint-disable-line
  });

  return rows;
});

/**
 * Gets the budget modifications for a project from Procore
 * @param {Object} _
 * @param {Object} args
 */
budgetApi.getModifications = (async (_, args) => {
  const mods = await procore.instance.get({
    url: '/projects/{projectId}/budget_modifications',
    params: args,
  });

  return mods;
});


/**
 * Queues an image to Box syncing job for a transaction
 * @param {Object} _
 * @param {Object} args
 * @param {Object} context
 */
budgetApi.syncImage = (async (_, args) => {
  const { transaction, projectNumber } = args;

  if (transaction.invoiceFile !== 'None' && transaction.invoiceFile !== '') {
    queue.create('image-fetch', { transaction, projectNumber }).save();
  }
});

/**
 * Fetches transactions for a project from Railway
 * Returns dictionary organizing transactions into groups using key '{costCode}-{category}'
 * @param {Object} _
 * @param {Object} args
 */
budgetApi.getProjectTransactions = (async (_, args) => {
  const transactionsMap = {};
  const filesMap = {};

  // fetch transactions from Railway
  const transactions = await railway.get({ url: '/budget', params: args });
  // fetch existing files
  const files = await models.Invoice.where({ projectNumber: args.projectId }).fetchAll();
  // create a dictionary of fileId: file
  files.forEach((file) => {
    filesMap[file.get('rowId')] = file;
  });

  // check which transactions have invoice images that need to be synced
  transactions.forEach((transaction) => {
    if (!filesMap[transaction.rowId]) {
      filesMap[transaction.rowId] = true;
      // queue an image syncing job
      budgetApi.syncImage(null, { transaction, filesMap, projectNumber: args.projectId });
    }

    if (!transactionsMap['{transaction.costCode}-{transaction.category}']) {
      transactionsMap['{transaction.costCode}-{transaction.category}'] = [];
    }

    // add the transaction to the dictionary
    transactionsMap['{transaction.costCode}-{transaction.category}'].push(transaction);
  });

  return transactionsMap;
});

/**
 * Updates a local transaction
 * @param {Object} _
 * @param {Object} args
 */
budgetApi.updateTransaction = (async (_, args) => {
  const transaction = await models.Transaction.where({ rowId: args.input.rowId }).fetch();
  if (args.input.description === '') Object.assign(args, { description: null });

  if (!transaction) return new models.Transaction(args.input).save();
  return transaction.set(args.input).save();
});

/**
 * Gets transactions for a particular project, costCode, and category
 * @param {Object} _
 * @param {Object} args
 */
budgetApi.getTransactions = (async (_, args) => {
  const categoryKeys = {
    Labor: 1,
    'Permanent Materials': 2,
    Supplies: 3,
    Equipment: 4,
    Subcontracts: 5,
    Overhead: 6,
  };

  // fetch transactions from Procore
  const projectTransactions = await budgetApi.getProjectTransactions(_, { projectId: args.projectNumber });
  // fetch local versions of transactions to sync up local notes/descriptions
  const localTransactions = await models.Transaction.where(args).fetchAll();
  // fetch list of invoice files for the project
  const files = await models.Invoice.where({ projectNumber: args.projectNumber }).fetchAll();

  // create dictionaries to lookup filex & transactions via keys
  const localTransactionsMap = {};
  const filesMap = {};

  files.forEach((file) => {
    filesMap[file.get('rowId')] = file;
  });

  localTransactions.forEach((transaction) => {
    localTransactionsMap[transaction.get('rowId')] = transaction;
  });

  // fetch transactions from railway
  const transactions = projectTransactions['{args.costCode}-{categoryKeys[args.category]}'] || [];

  transactions.forEach((transaction) => {
    const local = localTransactionsMap[transaction.rowId];

    // link description stored locally to railway transaction
    if (local) {
      transaction.description = local.get('description') || transaction.description;
    }

    // link boxId stored locally to railway transaction
    if (filesMap[transaction.rowId]) {
      transaction.boxId = filesMap[transaction.rowId].get('boxId');
    }
  });

  return transactions;
});

budgetApi.getDivision = (async (_, args) => {
  const divisions = {
    1: 'General Requirements',
    2: 'SITEWORK',
    3: 'CONCRETE',
    4: 'MASONRY',
    5: 'METALS',
    6: 'WOOD & PLASTICS',
    7: 'THERMAL-MOISTURE PROTECTION',
    8: 'DOORS & WINDOWS',
    9: 'FINISHES',
    10: 'SPECIAL CONDITIONS',
    11: 'Equipment',
    12: 'Interior',
    13: 'Special Construction',
    14: 'CONVEYING SYSTEMS',
    15: 'MECHANICAL',
    16: 'ELECTRICAL',
    90: 'Architecture & Design',
    95: 'Fabrication',
    99: 'Fee',
  };

  return divisions[args.costCode.split('-')[0]];
});

budgetApi.cache = {
  get: { key: 'budget', ttl: ms('6m') },
  getLineItems: { key: 'budget-line-items', ttl: ms('6m') },
  getModifications: { key: 'budget-modifications', ttl: ms('6m') },
  getProjectTransactions: { key: 'project-transactions', ttl: ms('6m') },
};

export default budgetApi;
`,
    }
  export default projectData

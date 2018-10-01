let projectData = {
    "databaseCode": ` # db.py - Andrew Nelson - Sage Connector (Railway)

    from pypika import Query, Table, Field
    import pyodbc, json, os, glob


    class db:

      def __init__(self):

        self.cnxn = None
        self.vendors = {}
        self.cursor = None

        self.tables = {
        'invoices': Table("MASTER_APM_INVOICE"),
        'jobs': Table("MASTER_JCM_JOB"),
        'categories': Table("MASTER_JCM_CATEGORY"),
        'extras': Table("MASTER_JCM_EXTRA"),
        'vendors': Table("MASTER_APM_VENDOR"),
        'costCodes': Table("MASTER_JCM_COST_CODE"),
        'transactions': Table("CURRENT_JCT_TRANSACTION")
        }

      # Connect to the database, obtain vender list, close connection.

      def connect(self):
        print("Connecting to DB...")
        self.cnxn = pyodbc.connect(DSN = 'sageData', UID = 'creature', PWD= 'creature', autocommit=True)
        self.cursor = self.cnxn.cursor()
        print("Connected")
        self.getVendors()
        self.cursor.close()

      def fetch(self, query, projectId):

        cursor = self.cnxn.cursor()

        # Run the query, walk the results and place into a dict

        try:
          cursor.execute(query) # EX: "select Amount, Description from MASTER_APM_INVOICE"
          columns = [column[0] for column in cursor.description]
          data = []

          row = cursor.fetchone()
          while row:
            data.append(dict(zip(columns, row)))
            row = cursor.fetchone()

        except Exception as e:
          return handleExcept(e, projectId)

        cursor.close()
        return data

      # Database stores full vendor names in different table, uses short version everywhere.
      # This function creates a dictionary of vendors for conversion to full name

      def getVendors(self):
        v = self.tables['vendors']
        cursor = self.cursor
        vendors = self.vendors

        q = Query.from_(v).select(
          v.Vendor,
          v.Name
        )

        try:
          cursor.execute(str(q).replace("\\"", ""))
          row = cursor.fetchone()
          vendors[""] = ""
          while row:
            vendors[row.Vendor.lower()] = row.Name.lower()
            row = cursor.fetchone()
        except Exception as e:
          vendors = e

    # Builds a query to retrieve all relevant transactions and corresponding fle paths for invoices.

      def buildQuery(self, projectId):
        i = self.tables['invoices']
        t = self.tables['transactions']

        q = Query.from_(t).join(
          i
        ).on_field(
            'Invoice',
            'Vendor'
        ).select(
          t.Job,
          t.Cost_Code,
          t.Category,
          t.Amount,
          t.Invoice,
          t.Vendor,
          t.Description,
          t.Transaction_Date,
          t.Units,
          t.Unit_Cost,
          t.Transaction_Type,
          t.Row_ID,
          i.Invoice_File_Links
        ).where(
          (t.Job == projectId) & ((t.Transaction_Type == 'AP cost') | (t.Transaction_Type == 'JC cost') | (t.Transaction_Type == 'PR cost')) #& (t.Transaction_Type.like('*Cost*'))
        )

        return q

    def handleExcept(err, projectId):
      print(err, projectId)
      return "API Error"
    `,
    "appCode": `# app.py - Andrew Nelson - Sage Connector (Railway)

    from flask import Flask, request, Response, jsonify, send_from_directory, redirect, url_for, after_this_request, g
    from .db import db
    from io import BytesIO
    import json, os, time
    from .models import Transaction, TransactionSchema
    from .auth import verify, auth_error, require_auth
    import base64

    # Run Instr.
    # .\\venv\\Scripts\\activate
    # python "C:\\Development\\railway\\src\\app.py"

    app = Flask(__name__, static_url_path='/static', static_folder='C:\\railway\\static')
    db = db()
    db.connect()
    @app.route("/")
    def hello():
      return "Welcome to Railway! Check out /budget"

    # Takes a project id as a parameter and sends back transaction data in JSON

    @app.route("/budget")
    @require_auth
    def getProjectTransactions():
      projectId = request.args.get('projectId')
      query = str(db.buildQuery(projectId)).replace("\\"", "").replace("JOIN", "LEFT JOIN")
      result = db.fetch(query, projectId)
      schema = TransactionSchema(many=True)
      transactions = dataToTransactions(result, projectId)

      if(isinstance(transactions, str)):
        return jsonify({"error": transactions}), 500
      else:
        data = schema.dump(transactions)
        return jsonify(data[0])

    # Converts raw query result to objectified data

    def dataToTransactions(data, projectId):
      transactions = []
      try:
        for item in data:
          vendor = db.vendors[item["Vendor"].lower()]
          if(not vendor or vendor == ''): vendor = "N/A"

          transactions.append(Transaction(
            item["Job"],
            item["Cost_Code"],
            item["Category"],
            item["Transaction_Type"],
            item["Transaction_Date"],
            item["Description"],
            item["Units"],
            item["Unit_Cost"],
            item["Amount"],
            item["Invoice"],
            str(item["Invoice_File_Links"]).split('|')[0],
            vendor,
            item["Row_ID"]
            ))

      except Exception as e:
        return handleExcept(e)

      return transactions

    @app.route('/static/<path:path>')
    def send_pdf(path):
      return send_from_directory('static', path)

    @app.after_request
    def per_request_callbacks(response):
        for func in getattr(g, 'call_after_request', ()):
            response = func(response)
        return response



    def handleExcept(err):
      print(err)
      return "API Error"

    if __name__ == "__main__":
      app.run(host="0.0.0.0")
    `,
    "modelCode": ` # models.py - Andrew Nelson - Sage Connector (Railway)

    from marshmallow import Schema, fields

class Transaction():
  def __init__(self, jobId, costCode, category, transactionType, date, description, units, unitCost, amount, invoice, invoiceFile, vendorId, rowId):
    self.jobId = jobId
    self.costCode = costCode
    self.category = category
    self.transactionType = transactionType
    self.date = date
    self.description = description
    self.units = units
    self.unitCost = unitCost
    self.amount = amount
    self.invoice = invoice
    self.invoiceFile = invoiceFile
    self.vendorId = vendorId
    self.rowId = rowId

  def __repr__(self):
    return '<Transaction(name={self.description!r}, vendor={self.vendorId!r})>'.format(self=self)


class TransactionSchema(Schema):
  jobId = fields.Str()
  costCode = fields.Str()
  category = fields.Str()
  transactionType = fields.Str()
  date = fields.Date()
  description = fields.Str()
  units = fields.Number()
  unitCost = fields.Number()
  amount = fields.Number()
  invoice = fields.Str()
  invoiceFile = fields.Str()
  vendorId = fields.Str()
  rowId = fields.Str()
  `,
  "serverCode": `# app_server.py - Andrew Nelson - Sage Connector (Railway)

  import win32serviceutil
  import win32service
  import win32event
  import servicemanager
  import configparser
  import os
  import sys
  import inspect
  import logging
  from logging.handlers import RotatingFileHandler
  import cherrypy
  import railway.app as app


  class AppServerSvc (win32serviceutil.ServiceFramework):
      _svc_name_ = "railway"
      _svc_display_name_ = "Railway Sage Connector"

      _config = configparser.ConfigParser()

      def __init__(self,args):
          win32serviceutil.ServiceFramework.__init__(self,args)
          self.hWaitStop = win32event.CreateEvent(None,0,0,None)
          self._config.read(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))) + '/config.ini')
          print(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))))
          print(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))) + '/teconfig.ini')

          print(os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe()))))
          print(self._config.sections())
          logDir = self._config["DEFAULT"]["loggingDir"]
          logPath = logDir + "/service-log.log"

          self._logger = logging.getLogger("railway")
          self._logger.setLevel(logging.DEBUG)
          handler = RotatingFileHandler(logPath, maxBytes=4096, backupCount=10)
          formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
          handler.setFormatter(formatter)
          self._logger.addHandler(handler)

      def SvcStop(self):
          self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
          cherrypy.engine.exit()
          win32event.SetEvent(self.hWaitStop)

      def SvcDoRun(self):
          self.ReportServiceStatus(win32service.SERVICE_RUNNING)
          servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,
                                servicemanager.PYS_SERVICE_STARTED,
                                (self._svc_name_,''))

          self._logger.info("Service Is Starting")

          self.main()

      def main(self):
          cherrypy.tree.graft(app.app, '/')
          cherrypy.config.update({'server.socket_host': '0.0.0.0',
                          'server.socket_port': 8080,
                          'engine.autoreload.on': False,
                          })
          rc = None
          while True:

              try:
                  cherrypy.engine.start()
                  cherrypy.engine.block()
              except KeyboardInterrupt:
                  self.SvcStop()

              # hang for 1 minute or until service is stopped - whichever comes first
              #rc = win32event.WaitForSingleObject(self.hWaitStop, (1 * 60 * 1000))

  if __name__ == '__main__':
      if len(sys.argv) == 1:
          servicemanager.Initialize()
          servicemanager.PrepareToHostSingle(AppServerSvc)
          servicemanager.StartServiceCtrlDispatcher()
      else:
          win32serviceutil.HandleCommandLine(AppServerSvc)
  `,
  "imageCode": `// ImageController.cs - Andrew Nelson - Railway Images
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Http;
  using Microsoft.AspNetCore.Mvc;

  namespace railway_sharp.Controllers
  {
      [Produces("application/json")]
      [Route("image")]
      public class ImageController : Controller
      {
          // GET: api/Image?path=...
          [HttpGet]
          [ProducesResponseType(200, Type = typeof(String))]
          [ProducesResponseType(400, Type = typeof(String))]
          public IActionResult Get(string path)
          {
              if (path == null)
              {
                  return Ok("Send a path, get an image!");
              }
              try
              {
                  Byte[] bytes = System.IO.File.ReadAllBytes(path);
                  String file = Convert.ToBase64String(bytes);
                  return Ok(new {image = file});
              }
              catch (Exception err)
              {
                  Console.WriteLine(err);
                  return BadRequest(ModelState);
              }
          }

          // POST: api/Image
          [HttpPost]
          public void Post([FromBody]string value)
          {
          }

          // PUT: api/Image/5
          [HttpPut("{id}")]
          public void Put(int id, [FromBody]string value)
          {
          }

          // DELETE: api/ApiWithActions/5
          [HttpDelete("{id}")]
          public void Delete(int id)
          {
          }
      }
  }`
    }
  export default projectData

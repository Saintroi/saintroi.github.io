import React, { Component } from 'react';
import './projects.css';
import AceEditor from 'react-ace'
import { Link } from 'react-router-dom';

import 'brace/mode/javascript'
import 'brace/theme/tomorrow_night'

export default class Event2 extends Component {
  render() {
    const data = this.props.projectData;

    return (
        <section id="project">
        <div id="home"></div>
            <h1>Sage Web Viewer (Event 2)</h1>
            <p> This project was probably the most ambitious and time-crunched of my time at Creature. Previously, detailed financial information for our construction projects was available only
                through a Macro-Enabled Excel Spreadsheet called EventOne, which connected to the Sage Accounting database. Several issues arose with this, including the sheet not working on newer
                versions of Excel, and having to be connected to our local network to access this information. Rather than allow the use of old, buggy tech to continue, we were tasked with creating
                something of our own that resolved these issues.
                
                <br></br> <br></br>
                
                The timetable for this was approximately 2 months, due to the overwhelming need for access to this data and also the limited time 
                we had before our other developer (a student intern) started his out-of-state internship. While he wrapped up school for the semester, I started on the local portion that
                connected to the Sage Accounting Database which I detail <a><Link to="/projects/sageconn">here.</Link> </a> Once he was done, we took the structure from our existing application
                that was designed to gather information from <a href="https://www.procore.com/">Procore</a> and used it to create a web application that allowed constant, reliable access to this information.
                We connected this application with Okta and Procore for authentication purposes, so users would only be able to see projects they had access to in Procore.

                <br></br> <br></br>

                This application was primarily written in Node.js, with a heavy reliance upon <a href="https://reactjs.org/">React</a> and <a href="https://graphql.org/">GraphQL</a> with a <a href="https://www.postgresql.org/">PostgreSQL</a> database.
            </p>

            <img src="/images/projects/event2/app_screen_1.png"></img>
            <br></br>
            <p>
                This app was already setup to pull data from Procore, so we went with an interface that seemed smart and familiar for our users. We recreated a table from the budget
                page for a project in Procore, and allowed users to drill down on each cost code (row) so they could see individual transactions for that specific cost code on a job.
                Below is a peek into the code that retrieves this data from Procore, although this is just one small piece of the puzzle.
            </p>

            <AceEditor
            mode='javascript'
            theme='tomorrow_night'
            name="SC_DB"
            highlightActiveLine={true}
            readOnly={true}
            value={data.projectCode}
            width="40%"
            style={{marginLeft: '30%', marginRight: '30%'}}
            ></AceEditor><br></br><br></br>

            <p>
                With the landing page good to go, we had to make some decisions about how to get the data for transactions on the page. We knew we were going to have a modal with a table
                of transactions, that was easy, but we had to come up with a process for getting that data where it belonged and handling changes, syc time, storage, and other issues.
                We landed on retrieving the data for a project whenever someone opened the page for it by putting it in a que for API calls, then looping over each cost code and comparing existing transactions to the ones
                received by the API call to the Sage Connector. We used Redis for caching so that all of these updates would take place in the background, only changing when the user refreshed the page.
                <br></br><br></br>
                
                For images of invoices, we had to get pretty creative. I go over some of the issues we had in my Sage Connector write-up, but essentially we needed a way to present TIFF image files.
                Luckily, Box allowed us to do just that by integrating with their API to upload images to a folder and then open them with the Box previewer. <br></br><br></br>

                Below is a screen-shot of the modal and a glimpse at some of the code that made this work.
            </p>
            <img src="/images/projects/event2/app_screen_2.png"></img>
            <br></br>

            <AceEditor
            mode='javascript'
            theme='tomorrow_night'
            name="SC_DB"
            highlightActiveLine={true}
            readOnly={true}
            value={data.budgetCode}
            width="40%"
            style={{marginLeft: '30%', marginRight: '30%'}}
            ></AceEditor><br></br><br></br>

            <p>
                This project was a big one for just about 2 months of work, but we were really proud of how it turned out and I learned a lot about how projects like this come together
                in a real-world setting and how cool it is to have lots of different applications communicating to create one seamless interface that's demonstratibly beneficial to people
                that I work with. <br></br><br></br>

                I do not claim to have written all of this code or created this application on my own, this was a joint effort between me and my coworker, Josh Burgin. I do not own this 
                application and as such cannot provide all of the code for it, what you've seen here is a very small part of the inner workings. All images in this writeup have been modified
                to remove sensitive information.
            </p>
      </section>
    );
  }
}

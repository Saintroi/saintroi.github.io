import React, { Component } from 'react';
import './projects.css';
import AceEditor from 'react-ace'
import { Link } from 'react-router-dom';

import 'brace/mode/python'
import 'brace/mode/csharp'
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

                <br></br> <br></br>

                This application was primarily written in Node.js, with a heavy reliance upon <a href="https://reactjs.org/">React</a> and <a href="https://graphql.org/">GraphQL</a> with a <a href="https://www.postgresql.org/">PostgreSQL</a> database.
            </p>

            <AceEditor
            mode='python'
            theme='tomorrow_night'
            name="SC_DB"
            highlightActiveLine={true}
            readOnly={true}
            value={data.databaseCode}
            width="40%"
            style={{marginLeft: '30%', marginRight: '30%'}}
            ></AceEditor><br></br><br></br>

            <p>
                That got me connected to the database and gave me a function to call that would
                give me all of the transaction data for a given project. From there I had to provide
                API access for our external app, so I added on to the Flask portion of the app.
                I also created a model with <a href="https://marshmallow.readthedocs.io/en/3.0/"> marshmallow </a>
                so that I could organize the data into objects and send it in an easy-to-manage JSON format.
                Maybe overkill for something this small, but it was good experience. <br></br>I also added an authentication
                function since we're dealing with some sensitive financial data.
            </p>

            <p>
                That about wraps it up! Some final notes: I wrote most of the code on this project myself while my colleague worked on the web application portion.
                 We did help each other out though, thus some of this code was written by him or made available to me on the internet to modify
                in accordance to my specific needs. As this was a company project and is on a private repository, I am unable to provide all of the code.
                 You can go to <a href="https://railway.creaturebuilds.com/">railway.creaturebuilds.com</a> if you want to check if it's still up and running,
                although there's not much to see without the auth token. (Please don't break it!)
            </p>
      </section>
    );
  }
}

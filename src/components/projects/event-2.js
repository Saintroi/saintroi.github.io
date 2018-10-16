import React, { Component } from 'react';
import './projects.css';
import AceEditor from 'react-ace'

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
            <p> This project is one of my favorite accomplishments in my developing career.
                It's unique, helpful, and it solved some challenging problems.<br></br><br></br>
                The company used Sage Accounting to store transaction data for construction jobs,
                including scanned invoice images. Some of this was uploaded to Procore, but the
                more detailed information wasn't and we had users that needed access to that.
                We set out to create an application to do that, which consisted of 2 parts: a locally hosted
                API and a web application. This page details the former, I've separated the latter
                onto a different project page.<br></br><br></br>

                Previously, they'd been using a complicated macro-enabled Excel spreadsheet to access
                this data, so that's where I started. I looked at the VBA code and how it connected
                to the Pervasive SQL database of Sage Accounting. I also worked with the CFO to open
                the database via Microsft Access and study the contents of the tables. From there,
                I sought to create a database connector and write a query that gave me the data I
                was looking for. <br></br><br></br>

                I decided to use Python as I'm most familiar with it, and I figured it could be a light solution.
                I created a basic <a href="http://flask.pocoo.org/"> Flask </a> app and created the database class below using
                a cool SQL query builder called <a href="https://github.com/kayak/pypika">PyPika </a> and a powerful module
                called <a href="https://github.com/mkleehammer/pyodbc">PyODBC</a> that let me connect to the database.
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

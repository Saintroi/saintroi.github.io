import React, { Component } from 'react';
import './projects.css';
import AceEditor from 'react-ace'

import 'brace/mode/python'
import 'brace/mode/csharp'
import 'brace/theme/tomorrow_night'

export default class SageConn extends Component {
  render() {
    const data = this.props.projectData;

    return (
        <section id="project">
        <div id="home"></div>
            <h1>Sage Connector</h1>
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

            <AceEditor
            mode='python'
            theme='tomorrow_night'
            name="SC_AP"
            highlightActiveLine={true}
            readOnly={true}
            value={data.appCode}
            width="40%"
            style={{marginLeft: '30%', marginRight: '30%'}}
            ></AceEditor><br></br>

            <AceEditor
            mode='python'
            theme='tomorrow_night'
            name="SC_MO"
            highlightActiveLine={true}
            readOnly={true}
            value={data.modelCode}
            width="40%"
            style={{marginLeft: '30%', marginRight: '30%'}}
            ></AceEditor><br></br><br></br>

            <p>
                We decided to put the image portion on hold in order to push ahead and make data available, so now that I had a fully functioning app, we had to host it and keep it running in production.
                This further evolved my hatred for Sage Accounting, and made me regret choosing Python. Here's why:<br></br><br></br>

                <li>The ODBC driver for the database connection was only available in 32-bit, so I had to use 32-bit python, which led to performance issues.</li>
                <li>The ODBC driver was only available if Sage Accounting was installed on the machine, therefore this had to be run on a Windows machine.</li>
                <li>Flask is not a production-level WSGI server, and finding one that will correctly run on Windows was an absolute nightmare.</li>
                <br></br><br></br>

                Eventually, I stumbled upon <a href="https://cherrypy.org/" >CherryPy</a> which allowed me to create
                a server wrapper around my Flask app that I could start from the command line. I also wanted this to start up in the background when the server started,
                so if it restarted for any reason I wouldn't have to manually turn it back on. Some googling led me to
                <a href="https://stackoverflow.com/questions/32404/how-do-you-run-a-python-script-as-a-service-in-windows/32440#32440"> this stackoverflow question</a> which in turn
                led me to pywin32. It took a while to figure out and involved some tricky stuff with Windows Environment Variables, but using this I was able to adjust my CherryPi server
                and install it as a service directly on our Sage Accounting server.
            </p>

            <AceEditor
            mode='python'
            theme='tomorrow_night'
            name="SC_MO"
            highlightActiveLine={true}
            readOnly={true}
            value={data.serverCode}
            width="40%"
            style={{marginLeft: '30%', marginRight: '30%'}}
            ></AceEditor><br></br>

            <p>
                Now, the part we had been avoiding: images. Each transaction came with a filepath to an image stored on our local network, so it seemed easy enough to add on
                to the railway API and just accept a filepath of a requested image, go get it, and send it back. That way the web app could present it directly and not really
                have to store anything. The first issue with that was a tough one: the images were only in TIFF format. I didn't know what TIFF was before this project but I quickly
                learned that it's a lossless format that allows for multiple pages, sorta like PDF. That's cool, but Safari is the only browser that supports viewing TIFF files natively.
                The next idea was to convert these images to PDF locally and then send them, but I was unable to find a Python module capable of doing the conversion and keeping a small
                file size.
                <br></br><br></br>

                Around this time we also ran into speed issues with the railway application and images. This was caused by a combination of network and hardware limitations of the Sage server
                itself. Thus a new solution began to form: I would create a C# application that runs on a different server just for images, it would take a path and send a TIFF file just
                as we originally planned. Then the web application would upload the TIFF image to Box via its API and use its built-in previewer (which supports TIFFs) to display the image.
                Luckily our company used Box and we had an unlimited amount of cloud storage with them, making this possible. My colleague was responsible for the Box integration on the web app
                which I will cover in a different writeup here on my portfolio.
                <br></br><br></br>

                Creating a C# API to provide images was simple enough, I loaded up Visual Studio and had it make a basic C#.NET API, for which I simply made a controller which I'll put below.
                I then used a neat feature of Visual Studio and IIS on Windows Server to easily deploy directly to the server from VS. I then used an NGINX server running on a local Ubuntu server
                to act as a web proxy and route traffic correctly between apps (differentiating /budget from /images) The whole process was so painless that I certainly wish I had started
                by creating a C# application, I planned to move the core funcitonality of the Python app over to the C# app but so far have not been allotted the time to do so.
            </p>

            <AceEditor
            mode='csharp'
            theme='tomorrow_night'
            name="SC_MO"
            highlightActiveLine={true}
            readOnly={true}
            value={data.imageCode}
            width="40%"
            style={{marginLeft: '30%', marginRight: '30%'}}
            ></AceEditor><br></br><br></br>

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

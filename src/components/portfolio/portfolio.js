import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './portfolio.css';

export default class Portfolio extends Component {
  render() {
    return (
        <section id="projects">
          <h1>Check Out Some of My Projects.</h1>
          <div id="portfolio"> {/* sage connector */}
            <div className="card">
              <h1>Sage Connector </h1>
              <a><Link to="/projects/sageconn">Project Write-Up</Link> </a>
              <p>Python, C#</p>
              <p>A locally-hosted API that enables retrieval of data from a Sage Accounting Database.</p>
            </div>{/* sage connector end */}
            <div className="card">
              <h1>Sage Viewer (Event 2) </h1>
              <a><Link to="/projects/event2">Project Write-Up</Link> </a>
              <p>Javascript, React, PostgreSQL</p>
              <p>A web application that allows users to see information pulled from Sage Accounting.</p>
            </div>{/* event 2 end */}
            <div className="card">
              test
            </div>{/* sage connector end */}
            <div className="card">
              test
            </div>{/* sage connector end */}
          </div> {/* portfolio end */}
      </section>
    );
  }
}

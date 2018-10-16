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
              <a><Link to="/projects/sage-connector">Project Write-Up</Link> </a>
              <p>Python, C#</p>
              <p>A locally-hosted API that enables retrieval of data from a Sage Accounting Database.</p>
            </div>{/* sage connector end */}
            <div className="card">
              test
            </div>{/* sage connector end */}
            <div className="card">
              test
            </div>{/* sage connector end */}
            <div className="card">
              test
            </div>{/* sage connector end */}
            <div className="card">
              test
            </div>{/* sage connector end */}
            <div className="card">
              test
            </div>{/* sage connector end */}
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

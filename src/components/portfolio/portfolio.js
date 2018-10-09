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
              test
            </div>{/* sage connector end */}
          </div> {/* portfolio end */}
      </section>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Resume from '../resume/resume';

export default class Skills extends Component {
  render() {
    return (
        <section id="skills">
                {/* Skills
      ----------------------------------------------- */}
          <div className="skills-box">
            <div> {/*Software Dev*/}
              <h1>Software Development</h1>
              <p>
              I enjoy writing clean code that solves a problem in the simplest way.
              </p>
              <h2>Languages I feel good about:</h2>
              <p>C#, Python, Java, SQL, JavaScript</p>
              <h2>Other languages I've used:</h2>
              <p>C, HTML, CSS, PHP, R, ASP.NET</p>
              <h2>Dev tools I like:</h2>
              <p>Visual Studio Code, Eclipse, Android Studio, SSCM, Notepad ++, Git</p>
            </div>
            <div> {/*Sys Admin*/}
              <h1>Systems Administration</h1>
              <p>
              I've been a computer nerd my entire life, I eventually decided to go pro.
              </p>
              <h2>Projects of note:</h2>
              <li>Domain migration of entire company</li>
              <li>Configured MDT & WDS image server</li>
              <li>VMware migration to Hyper-V</li>
              <li>Office 365 Migration</li>
              <h2>Operating Environments:</h2>
              <p>Windows, Windows Server, Linux Command Line, Ubuntu Server, OSX</p>
              <h2>Admin tools I like</h2>
              <p>RSAT, Hyper-V, SCCM, Sharepoint</p>
            </div>
            <div> {/*Music*/}
              <h1>Music</h1>
              <p>
              I play music mostly for fun, though I've occasionally gotten paid for it.
              </p>
              <h2>Instruments I play:</h2>
              <p>Trumpet (11 Years), Some vocals, Learning bass</p>
              <h2>Bands I've been in:</h2>
              <li>UA MDB and Concert</li>
              <li>Birmingham Community Concert</li>
              <h2>Fun Fact:</h2>
              <p>I composed sheet music for a LOTR song by watching someone play it on YouTube!</p>
            </div>
          </div>{/*End Skills*/}

          <div class="resume-link">
          <h1>For more info on my experience, click <Link to="/resume">here</Link> to see my extended writeup. WARNING: It's a lot of reading!</h1>


          </div>
      </section>
    );
  }
}

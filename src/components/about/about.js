import React, { Component } from 'react';
export default class About extends Component {
  render() {
    return (
        <section id="about">
        <div className="row">
          <div className="three columns">
            <img className="profile-pic" src="images/profilepic.jpg"/>
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>
            <p>I grew up in the small town of Woodstock, Alabama where I became obsessed with computers at a very young age.
              From playing ROT on Windows 95 at the age of 3, technology followed me through my childhood and was always the obvious choice for my career in my eyes.
              <br />
              <br />
              I got my first taste of programming and being a musician in middle school, then elaborated on both in high school and became a professional in college.
              They are an important part of who I am, but software development is what I do for a living, so let's talk about that!

            </p>
            <div className="row">
              <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <span>Andrew Nelson</span><br />
                  <span>905 Ridgewood Circle<br />
                    Birmingham, AL 35235 US
                  </span><br />
                  <span>(205) 908-8720</span><br />
                  <span>adnelson@crimson.ua.edu</span>
                </p>
              </div>
              <div className="columns download">
                <p>
                  <a href="https://1drv.ms/b/s!Ag-mlWGXPtycga5nj4h1BmwCMbXzow" className="button"><i className="fa fa-download" />Download Resume</a>
                </p>
              </div>
            </div> {/* end row */}
          </div> {/* end .main-col */}
        </div>
      </section>
    );
  }
}

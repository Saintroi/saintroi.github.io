import React, { Component } from 'react';
export default class About extends Component {
  render() {
    return (
        <section id="about">
        <div className="row">
          <div className="three columns">
            <img className="profile-pic" src="images/profilepic.jpg" alt />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>
            <p>I grew up in the small town of Woodstock, Alabama where I became obsessed with computers at a very young age.
              From playing ROT on Windows 95 at the age of 3, technology followed me through my childhood and was always the obvious choice for my career in my eyes.
              In middle school, I joined an online gaming community where I got my first taste of programming through working on the group website. 
              In high school, I took an AP CS class where I learned Java and the basics of Object Orientation, and from there had made up my mind to pursue a degree in computer science.
              I also wanted to continue my development as a musician, so I decided to attend the University of Alabama where I could participate in the Million Dollar Band and university concert bands,
              as well as get a quality education in CS from the college of engineering.

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
                  <a href="#" className="button"><i className="fa fa-download" />Download Resume</a>
                </p>
              </div>
            </div> {/* end row */}
          </div> {/* end .main-col */}
        </div>
      </section>
    );
  }
}
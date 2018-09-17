import React, { Component } from 'react';
export default class Skills extends Component {
  render() {
    return (
        <section id="skills">
                {/* Skills
      ----------------------------------------------- */}
        <div className="row skill">
          <div className="three columns header-col">
            <h1><span>Software Dev</span></h1>
            
          </div>
          <div className="nine columns main-col">
            <p>I'm a young software developer, I don't pretend to know everything there is to know about it, but I do feel that
              I have been lucky enough to do a lot of real development work that directly affected applications and people, 
              not just debugging someone else's code. So even though I spend a lot of time googling, I am comfortable getting things done.
              My experience is all over the place, but I feel the most alive in back-end development and scripting work.
            </p>
            <div className="bars">
              <ul className="skills">
                <h1>Languages I Can Write an Application in Right Now</h1>
              </ul>
            </div>{/* end skill-bars */}
          </div> {/* main-col end */}
        </div> {/* End skills */}
      </section>
    );
  }
}
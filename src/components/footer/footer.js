import React, { Component } from 'react';
export default class Footer extends Component {
  render() {
    return (
        <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links">
              <li><a href="#"><i className="fa fa-facebook" /></a></li>
              <li><a href="#"><i className="fa fa-twitter" /></a></li>
              <li><a href="#"><i className="fa fa-linkedin" /></a></li>
              <li><a href="#"><i className="fa fa-instagram" /></a></li>
            </ul>
            <ul className="copyright">
              <li>This site was created by Andrew Nelson and is free for use by anyone.</li>
            </ul>
          </div>
          <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open" /></a></div>
        </div>
      </footer>
    );
  }
}
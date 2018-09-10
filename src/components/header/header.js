import React, { Component } from 'react';
export default class Header extends Component {
  render() {
    let data = this.props.resumeData;
    return (
   <header id="home">
   <nav id="nav-wrap">
     <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
     <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
     <ul id="nav" className="nav">
       <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
       <li><a className="smoothscroll" href="#about">About</a></li>
       <li><a className="smoothscroll" href="#resume">Resume</a></li>
       <li><a className="smoothscroll" href="#portfolio">Works</a></li>
     </ul> {/* end #nav */}
   </nav> {/* end #nav-wrap */}
   <div className="row banner">
     <div className="banner-text">
       <h1 className="responsive-headline">I'm {data.name}.</h1>
       <h3>I'm a {data.location} based <span>software developer</span>, <span>tech wizard</span> and <span>musician.</span> Let's create awesome software and make an impact on the world!</h3>
       <hr />
       <ul className="social">
         <li><a href="#"><i className="fa fa-facebook" /></a></li>
         <li><a href="#"><i className="fa fa-twitter" /></a></li>
         <li><a href="#"><i className="fa fa-linkedin" /></a></li>
         <li><a href="#"><i className="fa fa-instagram" /></a></li>
       </ul>
     </div>
   </div>
   <p className="scrolldown">
     <a className="smoothscroll" href="#about"><i className="icon-down-circle" /></a>
   </p>
   </header>
    );
  }
}
import React, { Component } from 'react';
import Header from './components/header/header';
import About from './components/about/about';
import Skills from './components/skills/skills';
import Portfolio from './components/portfolio/portfolio';
import Footer from './components/footer/footer';
import resumeData from './resumeData';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header resumeData={resumeData}/>
        <About />
        <Skills />
        <Portfolio />
        <Footer />
      </div>
    );
  }
}
export default App;
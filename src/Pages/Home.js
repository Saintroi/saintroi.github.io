import React from 'react';
import Header from '../components/header/header';
import resumeData from '../Data/resumeData';
import About from '../components/about/about';
import Skills from '../components/skills/skills';
import Portfolio from '../components/portfolio/portfolio';

export default () => (
  <div>
    <Header resumeData={resumeData}/>
    <About />
    <Skills />
    <Portfolio />
  </div>
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from './scroll'

const Root = () => (
  <BrowserRouter>
  <ScrollToTop>
        <App />
  </ScrollToTop>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

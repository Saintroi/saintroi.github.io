import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer/footer';
import Home from './Pages/Home';
import Resume from './Pages/Resume';
import SageConn from './Pages/SageConn'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/projects/sageconn" component={SageConn} />
          <Route path="/resume" component={Resume} />
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/footer/footer';
import Home from './Pages/Home';
import Resume from './Pages/Resume';
import SageConn from './Pages/SageConn'
import Event2 from './Pages/Event2'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/projects/sageconn" component={SageConn} />
          <Route exact path="/projects/event2" component={Event2} />
          <Route path="/resume" component={Resume} />
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home';
import InvalidPath from '../components/invalid_path';

class App extends Component {

  render() {
    return (
      <div>
      <h1 id="homeLink"><a href="/">Linky</a></h1>
      <Router>
      <Switch>
              <Route exact path='/' component={Home} />
              <Route path='*' component={InvalidPath} />
      </Switch>
      </Router>
      </div>
    );
  }
}


export default App;

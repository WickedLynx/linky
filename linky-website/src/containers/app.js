import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';
import AddLinkView from './add_link_view';
import InvalidPath from '../components/invalid_path';

class App extends Component {

  render() {
    return (
      <div id="appContainer">
		  <div id="brand">
			  <a href="/">
				<h1>Linky</h1>
			  </a>
		  </div>
      <Router>
      <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/add' component={AddLinkView} />
              <Route path='*' component={InvalidPath} />
      </Switch>
      </Router>
      </div>
    );
  }
}


export default App;

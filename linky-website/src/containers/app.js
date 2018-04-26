import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';
import AddLinkView from './add_link_view';
import { Link } from 'react-router-dom';
import '../css//style.css';
import '../css/add_page.css';

class App extends Component {

  render() {
    return (
      <div id="appContainer">
		  <div id="brand">
			  <Link to="/">
				<h1>Linky</h1>
			  </Link>
		  </div>
      <Router basename="/linky">
      <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/add' component={AddLinkView} />
      </Switch>
      </Router>
      </div>
    );
  }
}


export default App;

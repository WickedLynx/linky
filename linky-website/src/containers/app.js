import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home';
import AddLinkView from './add_link_view';
import LoginView from './login_view';
import '../css//style.css';
import '../css/add_page.css';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div id="appContainer">
      <Router basename="/linky">
		  <div>
			  <div id="brand">
				  <Link to="/"><h1>Linky</h1></Link>
			  </div>
			  <Switch>
				  <Route exact path='/' component={Home} />
				  <Route exact path='/add' component={AddLinkView} />
				  <Route exact path='/login' component={LoginView} />
			  </Switch>
		  </div>
      </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return { isLoggedIn: state.auth.isLoggedIn };
}
export default connect(mapStateToProps)(App);

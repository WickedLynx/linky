import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import '../css/login.css';

class LoginView extends Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "" };
	}

	login() {
		this.props.login(this.state.username, this.state.password);
	}

	render() {
		if (this.props.isLoading) {
			return <div><p> Loading... </p></div>
		}
		var error = "";
		if (this.props.error) {
			error = this.props.error.message || "";
		}
		return(
			<div id="loginContainer">
				<div id="loginError"><p>{ error }</p></div>
				<div>
				<input type="text" placeholder="username" value={this.state.username} className="inputField"
				onChange={(event) => {
					this.setState({...this.state, ...{ username: event.target.value }});
				}}></input>
				</div>
				<div>
				<input placeholder="Password" type="password" className="inputField" value={this.state.password}
				onChange={(event) => {
					this.setState({...this.state, ...{ password: event.target.value }});
				}}></input>
				</div>
				<button onClick={() => {
					this.login();
				}}>Login</button>
			</div>
		);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.isLoggedIn) {
		  this.props.history.push('/');
		}
	}
}

function mapStateToProps(state) {
	return { isLoading: state.auth.isLoading, isLoggedIn: state.auth.isLoggedIn, error: state.auth.error  };
}

export default connect(mapStateToProps, { login })(LoginView);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			email: '',
			password: '',
			submitted: false
		};
	}

	componentDidUpdate() {
		if (this.props.user.token) {
			browserHistory.push('/user');
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		
		this.setState({ submitted: true });
		this.props.login({ email: this.state.email, password: this.state.password });
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	renderErrorMessage() {
		if (this.props.user.error && this.state.submitted) {
			return (
				<div className="bg-danger">
					<p className="text-muted text-center">Wrong username or password</p>
				</div>
			);
		}
	}

	render() {
		return (
			<div className='container-fluid'>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label>email</label>
						<input 
							type="text" 
							className="form-control"
							value={this.state.email} 
							onChange={this.handleChange.bind(this)} 
							name="email" />
					</div>

					<div className="form-group">
						<label>password</label>
						<input 
							type="password" 
							className="form-control"
							value={this.state.password}
							onChange={this.handleChange.bind(this)} 
							name="password"/>
					</div>
					
					{this.renderErrorMessage()}

					<button type="submit" className='btn btn-primary'>Log in</button>
				</form>

				<Link to='/signup'>sign up</Link>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps, actions)(Login);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';

class Submit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: '',
			submitted: false
		};
	}

	componentDidUpdate() {
		if (!this.props.user.token) browserHistory.push('/');
	}

	handleSubmit(e) {
		e.preventDefault();

		const { title, description } = this.state;

		this.props.submit(this.props.user.token, { title, description });
		this.setState({ submitted: true });
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	renderErrorMessage() {
		if (this.props.submission.error && this.state.submitted) {
			return (
				<div className="bg-danger">
					<p className="text-muted text-center">There was an error</p>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label>Title</label>
						<input 
							className="form-control" 
							value={this.state.title} 
							onChange={this.handleChange.bind(this)} 
							type="text"
							name="title"/>
					</div>
					<div className="form-group">
						<label>Description</label>
						<input 
							className="form-control" 
							value={this.state.description}
							onChange={this.handleChange.bind(this)} 
							type="text"
							name="description"/>
					</div>

					{this.renderErrorMessage()}

					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { user: state.user, submission: state.submission };
}

export default connect(mapStateToProps, actions)(Submit);
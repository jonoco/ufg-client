import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';

class Friends extends Component {
	constructor(props) {
		super(props);

		this.state = {
			friendName: ''
		};
	}

	componentDidUpdate() {
		if (!this.props.user.token) browserHistory.push('/');
	}

	componentWillMount() {
		this.props.getUsers(this.props.user.token);
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.addFriend(this.props.user.token, e.target.id);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	renderUsers() {
		return (
			<div className="list-group">
				{this.props.users.users.map(function(user) {
					if (user.email == this.props.user.username) return;

					const friend = (_.includes(this.props.user.friends, user._id)) ? ' list-group-item-success' : '';
					const className = "list-group-item clearfix" + friend;

					return(
						<div 
							key={user._id} 
							className={className}>
							<p>{user.email}</p>
							<button
								className="pull-right btn btn-default"
								onClick={this.handleSubmit.bind(this)}
								id={user._id}>
								Add
							</button>
						</div>
					);
				}.bind(this))}
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input 
						type="text" 
						value={this.state.friendName}
						onChange={this.handleChange.bind(this)}
						name="friendName" />
					<button>Add friend</button>
				</form>
				{this.renderUsers.bind(this)()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { 
		user: state.user, 
		users: state.users
	};
}

export default connect(mapStateToProps, actions)(Friends);
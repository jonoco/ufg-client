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

	handleAdd(e) {
		e.preventDefault();
	
		this.props.addFriend(this.props.user.token, e.currentTarget.dataset.id);
	}

	handleRemove(e) {
		e.preventDefault();

		this.props.removeFriend(this.props.user.token, e.currentTarget.dataset.id);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	renderUsers() {
		return (
			<div className='list-group'>
				{this.props.users.users.map(function(user) {
					if (user.email == this.props.user.username) return;

					const isFriend = _.includes(this.props.user.friends, user._id);

					return(
						<div 
							key={user._id} 
							className={isFriend ? 'list-group-item clearfix list-group-item-success' : 'list-group-item clearfix'}>
							<p>{user.email}</p>
							<div className='pull-right' role='group'>
								<button
									className={isFriend ? 'hidden' : 'btn btn-default'}
									onClick={this.handleAdd.bind(this)}
									data-id={user._id}>
									<span className='glyphicon glyphicon-plus' aria-hidden='true'></span>
								</button>
								<button
									className={isFriend ? 'btn btn-danger' : 'hidden'}
									onClick={this.handleRemove.bind(this)}
									data-id={user._id}>
									<span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
								</button>
							</div>
						</div>
					);
				}.bind(this))}
			</div>
		);
	}

	render() {
		return (
			<div className='container'>
				<form 
					className='hidden'
					onSubmit={this.handleAdd.bind(this)}>
					<input 
						type='text' 
						value={this.state.friendName}
						onChange={this.handleChange.bind(this)}
						name='friendName' />
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
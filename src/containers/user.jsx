import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';

export default class User extends Component {
	componentDidMount() {
		if (!this.props.user.token) browserHistory.push('/');

		this.loadItems();
	}

	componentDidUpdate() {
		if (!this.props.user.token) browserHistory.push('/');
	}

	loadItems() {
		this.props.getItems(this.props.user.token);
	}

	renderItems() {
		return (
			<ul className="list-group">
				{this.props.item.items.map(function(item) {
					return( 
						<li key={item._id} className="list-group-item">
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</li>
					);
				})}
			</ul>
		);
	}

	render() {
		return (
			<div className="container">
				<h1>This is the user page, woot!</h1>
				{this.renderItems()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { 
		user: state.user, 
		item: state.item, 
		users: state.users };
}

export default connect(mapStateToProps, actions)(User);
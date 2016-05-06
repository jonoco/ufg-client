import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';

class User extends Component {
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

	handleDelete(e) {
		this.props.deleteItem(this.props.user.token, {id: e.target.id});
	}

	renderItems() {
		return (
			<ul className="list-group">
				{this.props.item.items.map(function(item) {
					if (item.user != this.props.user.id) return;

					return( 
						<li key={item._id} className="list-group-item row">
							<div className="col-sm-10">
								<h4>{item.title}</h4>
								<p>{item.description}</p>
							</div>
							<div className="col-sm-2">
								<br />
								<button 
									className="btn btn-danger" 
									id={item._id}
									onClick={this.handleDelete.bind(this)}>
									Delete
								</button>
							</div>
						</li>
					);
				}.bind(this))}
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
		item: state.item
	};
}

export default connect(mapStateToProps, actions)(User);
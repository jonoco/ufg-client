import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';

class Items extends Component {
	componentDidMount() {
		this.loadItems();
	}

	loadItems() {
		this.props.getItems(this.props.user.token, {friends: true});
	}

	renderItems() {
		return (
			<div className="list-group">
				{this.props.item.items.map(function(item) {
					if (item.user == this.props.user.id) return;

					return( 
						<Link to={`items/${item._id}`} key={item._id} className="list-group-item">	
							<h3>{item.title}</h3>
							<h4>{item.username}</h4>
							<p>{item.description}</p>
						</Link>
					);
				}.bind(this))}
			</div>
		);
	}

	render() {
		if (this.props.children) { 
			return <div>{this.props.children}</div>;
		}

		return (
			<div className="container">
				<h1>Items available from your friends</h1>
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

export default connect(mapStateToProps, actions)(Items);
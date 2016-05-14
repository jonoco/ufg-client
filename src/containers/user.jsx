import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';

class User extends Component {
	componentDidMount() {
		this.loadItems();
	}

	loadItems() {
		this.props.getItems(this.props.user.token);
	}

	handleDelete(e) {
		this.props.deleteItem(this.props.user.token, e.currentTarget.dataset.id);
	}

	convertImageBuffer(buffer, type) {
		let base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)))
		console.log(`data:${type};base64,${base64String}`);
		return `data:${type};base64,${base64String}`;
	}

	renderItems() {
		return (
			<ul className="media-list">
				{this.props.item.items.map(function(item) {
					if (item.postedBy !== this.props.user.username) return;

					//const imageSrc = this.convertImageBuffer(item.imageURI.data, item.imageType);

					return( 
						<li key={item._id} className="media">
							<div className="media-left">
								<img src={item.imageURI} width='64' className="media-object"/>
							</div>
							<div className="media-body">
								<h4>{item.title}</h4>
								<p>{item.description}</p>
							</div>
							<div className="media-right">
								<br />
								<button 
									className="btn btn-danger" 
									data-id={item._id}
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
				<h2>My posted items</h2>
				{this.renderItems()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { 
		user: state.user, 
		item: state.item,
		messages: state.message.messages
	};
}

export default connect(mapStateToProps, actions)(User);
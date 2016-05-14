import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import _ from 'lodash';

class Notification extends Component {
	constructor(props) {
		super(props);

		this.state = {
			openMessageID: null,
			message: {}
		};
	}

	componentWillMount() {
		this.props.getMessages(this.props.user.token);
	}

	handleMessageClick(e) {
		const messageID = e.currentTarget.dataset.id;
		// open new item or close the current one
		const openMessageID = this.state.openMessageID === messageID ? null : messageID;
		// grab the selected message from the props
		const message = _.find(this.props.messages, message => {
			return message._id === openMessageID;
		});

		this.setState({ 
			openMessageID, 
			message
		});
	}

	handleAcceptRequest(e) {
		// update message.status from pending to accepted
		this.props.acceptRequest(this.props.user.token, this.state.message);
	}

	renderMessage(message, user) {	
		return (
			<div key={message._id}>
				<Link 
					to={`items/${message.itemID}?user=${user}`} 
					className="list-group-item">
					{message.itemTitle}
					<span className='pull-right'>{message.userFrom}</span>
				</Link>
			</div>
		);
	}

	renderSentRequests() {
		const displayedItems = [];

		return (
			<div className="list-group">
				{this.props.messages.map(message => {
					// only show my requests, without duplicating messages for the same item
					if (message.userFrom === this.props.user.username && !_.includes(displayedItems, message.itemID)) {
						displayedItems.push(message.itemID);

						return this.renderMessage(message, message.userTo);
					}
				})}
			</div>
		);
	}

	renderReceivedRequests() {
		// { itemID: [ user, ... ] }
		const displayedMessages = {};

		// filter all messages to me
		const requests = _.filter(this.props.messages, message => {
			if (message.userTo === this.props.user.username) return message;
		})

		// prepare displayedMessages to hold user references
		_.forEach(requests, message => {
			displayedMessages[message.itemID] = [];
		});

		// filter messages by item
		return (
			<div className="list-group">
				{requests.map(message => {
					if (!_.includes(displayedMessages[message.itemID], message.userFrom)) {
						// hide duplicates from same user
						displayedMessages[message.itemID].push(message.userFrom);
		
						return this.renderMessage(message, message.userFrom);
					}
				})}
			</div>
		);
	}

	render() {
		if (this.props.children) {
			return <div>{this.props.children}</div>;
		}

		return(
			<div className="container">	
				<h2>My sent requests</h2>
				{this.renderSentRequests()}
				<h2>My received requests</h2>
				{this.renderReceivedRequests()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { 
		messages: state.message.messages,
		user: state.user
	};
}

export default connect(mapStateToProps, actions)(Notification);
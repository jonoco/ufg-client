import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import * as actions from '../actions';
import _ from 'lodash';
import moment from 'moment';

class ItemDetail extends Component {
	constructor(props) {
		super(props);

		const { itemID } = this.props.params;
		const { user } = this.props.location.query;
		
		const item = _.find(this.props.items, item => {
			return item._id === itemID;
		});

		const messages = this.filterMessages(this.props.message.messages, item);
		
		this.state = { item, messages, user };
	}

	componentWillMount() {
		// check we're in a valid conversation by checking usernames
		if (this.state.user !== this.state.item.postedBy && this.state.user !== this.props.user.username) {
			return browserHistory.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		const messages = this.filterMessages(nextProps.message.messages, this.state.item);

		this.setState({ messages });
	}

	// get all messages to and from this user, about this item
	filterMessages(messages, item) {
		return _.filter(messages, message => {
			return (message.userTo === item.postedBy 
							|| message.userFrom === item.postedBy) 
							&& message.itemID === item._id;
		});
	}

	handleFormSubmit({ message }) {
		this.props.sendMessage(this.props.user.token, {
			text: message,
			itemID: this.state.item._id,
			itemTitle: this.state.item.title,
			to: this.state.user
		});

		this.props.resetForm();
	}

	renderMessages() {
		if (_.isEmpty(this.state.messages)) {
			return (
				<div className='well'>
					<small>Try sending a message!</small>
				</div>
			);
		}

		return (
			<div className='well'>
				{this.state.messages.map(message => {
					const time = moment(message.time).format('ddd, h:mm a');

					return (
						<div key={message._id}>
							<small>{message.userFrom}</small>
							<span className="pull-right">{time}</span>
							<p className='clearfix'>{message.text}</p>
						</div>
					);
				})}
			</div>
		);
	}

	render() {
		const { handleSubmit, fields: { message } } = this.props;
		const { title, username, description } = this.state.item;

		return (
			<div className="container">
				<h1>{title}</h1>
				<h2>{username}</h2>
				<p>{description}</p>
				<br/>
				{this.renderMessages()}
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<input {...message} className='form-control' rows="1" placeholder='Send a message'/>
					<br/>
					<button className="btn btn-primary" type="submit">Send</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { 
		user: state.user, 
		items: state.item.items,
		message: state.message 
	};
}

function validate(formProps) {
	const errors = {};

	if (!formProps.message) errors.message = 'Please enter a message';

	return errors;
}

export default reduxForm({
	form: 'request',
	fields: ['message'],
	validate
}, mapStateToProps, actions)(ItemDetail);
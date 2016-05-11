import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class ItemMessage extends Component {
	componentWillMount() {
		const { itemID } = this.props.params;
		const { user } = this.props.location.query;
		this.setState({ user });
		
		const item = this.props.items.filter(item => {
			return item._id === itemID;
		})[0];
		this.setState({ item });
	}

	handleFormSubmit({ message }) {
		this.props.sendMessage(this.props.token, {
			text: message,
			itemID: this.state.item._id,
			itemTitle: this.state.item.title,
			to: this.state.user
		});

		this.props.resetForm();
	}

	renderMessages() {
		if (!this.props.message) return <div className='well'>Loading messages</div>;

		const itemID = this.props.params.itemID;
		const messages = this.props.message.messages || [];

		return (
			<div className="well">
				{messages.map(message => {
					if (message.itemID === itemID) { 
						return (
							<div key={message._id}>
								<small>{message.userFrom}</small>
								<small className="pull-right">{message.time}</small>
								<p>{message.text}</p>
							</div>
						);
					}
				})}
			</div>
		);
	}

	renderForm() {
		const { handleSubmit, fields: { message } } = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<input {...message} className='form-control' type='text' placeholder='Send a message' />	
				<br/>
				<button className="btn btn-primary" type="submit">Send</button>
			</form>
		);
	}

	render() {
		return(
			<div className="container">
				<h1>Item: {this.props.params.itemID}</h1>
				{this.renderMessages()}
				{this.renderForm()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { 
		token: state.user.token,
		message: state.message,
		items: state.item.items
	};
}

export default reduxForm({
	form: 'request',
	fields: ['message']
}, mapStateToProps, actions)(ItemMessage);



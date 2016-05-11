import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class ItemDetail extends Component {
	componentWillMount() {
		const { itemID } = this.props.params;
		
		this.item = this.props.items.filter(item => {
			return item._id === itemID;
		})[0];
	}

	handleFormSubmit({ message }) {
		this.props.sendMessage(this.props.token, {
			text: message,
			itemID: this.item._id,
			itemTitle: this.item.title,
			to: this.item.username
		});

		this.props.resetForm();
	}

	render() {
		const { handleSubmit, fields: { message } } = this.props;

		return (
			<div className="container">
				<h1>{this.item.title}</h1>
				<h2>{this.item.username}</h2>
				<p>{this.item.description}</p>
				<br/>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<textarea {...message} className='form-control' rows="3" placeholder='Add a request message'></textarea>
					<br/>
					<button className="btn btn-primary" type="submit">Request</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { 
		token: state.user.token, 
		items: state.item.items 
	};
}

export default reduxForm({
	form: 'request',
	fields: ['message']
}, mapStateToProps, actions)(ItemDetail);
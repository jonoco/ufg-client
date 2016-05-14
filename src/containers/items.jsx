import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';

class Items extends Component {
	constructor(props) {
		super(props);

		this.state = {
			openItem: null,
			item: null,
			submitted: false
		};
	}

	componentDidMount() {
		this.loadItems();
	}

	loadItems() {
		this.props.getItems(this.props.user.token, '?friends=true');
	}

	handleItemClick(e) {
		// itemID taken from data-id attr on item
		const itemID = e.currentTarget.dataset.id;
		const openItem = this.state.openItem === itemID ? null : itemID; // open new item or close the current one
		const item = _.find(this.props.item.items, item => {
			return item._id === openItem;
		});

		// check if a message has already been sent for this item
		const message = _.find(this.props.message.messages, message => {
			return message.itemID === openItem;
		});

		this.setState({ 
			openItem, 
			item,
			message
		});
	}

	handleFormSubmit({ message }) {
		this.props.sendMessage(this.props.user.token, {
			text: message,
			itemID: this.state.item._id,
			itemTitle: this.state.item.title,
			to: this.state.item.username,
			type: 'request',
			status: 'pending'
		});

		this.setState({ submitted: true });
		this.props.resetForm();
	}

	// if a request has already been sent, it's displayed above the request form
	renderMessage() {
		return (
			<div className='well'>
				{this.state.message.text}
				<span className="pull-right">{this.state.message.time}</span>
			</div>
		);
	}

	// Request form opens after clicking on an item
	renderRequestForm(item) {
		if (this.state.openItem !== item._id) return;

		const { handleSubmit, fields: { message } } = this.props;
		const { isAccessing, error } = this.props.message;

		return (
			<div className='well'>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<input {...message} className='form-control' type='text' placeholder='Send a request' />	
					<br/>
					<button className="btn btn-primary" type="submit">Send</button>
					{!isAccessing && !error && this.state.submitted && <span className='label label-success'>Sent!</span>}
				</form>
			</div>
		);
	}

	renderItems() {
		return (
			<ul className="list-group">
				{this.props.item.items.map(item => {
					// don't display my own items
					if (item.user == this.props.user.id) return;

					return(
						<div key={item._id}>
							<Link 
								to={`items/${item._id}?user=${item.postedBy}`} 
								className="list-group-item row">
								<div className="col-sm-2">
									<img src={item.imageURI} width='64'/>	
								</div>
								<div className="col-sm-10">
									<h3>{item.title}</h3>
									<h4>{item.username}</h4>
									<p>{item.description}</p>
								</div>
							</Link>
						</div>
					);
				})}
			</ul>
		);
	}

	render() {
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
		item: state.item,
		message: state.message
	};
}

export default reduxForm({
	form: 'request',
	fields: ['message']
}, mapStateToProps, actions)(Items);
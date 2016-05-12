import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions';

class Submit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: '',
			imageURI: null,
			imageName: null,
			imageType: null,
			submitted: false
		};
	}

	componentDidUpdate() {
		if (!this.props.user.token) browserHistory.push('/');

		if (!this.props.submission.isAccessing && !this.props.submission.error && this.state.submitted) {
			browserHistory.push('/user');
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		const { title, description, imageURI, imageType } = this.state;

		this.props.submitItem(this.props.user.token, { title, description, imageURI, imageType });
		this.setState({ submitted: true });
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleFile(e) {
		const reader = new FileReader();
		const file = e.target.files[0];

		reader.onload = upload => {
			this.setState({
				imageURI: upload.target.result,
				imageName: file.name,
				imageType: file.type
			});
		}

		reader.readAsDataURL(file);
	}

	renderErrorMessage() {
		if (this.props.submission.error && this.state.submitted) {
			return (
				<div className="bg-danger">
					<p className="text-muted text-center">There was an error</p>
				</div>
			);
		}
	}

	renderImage() {
		if (!this.state.imageURI) return;

		return (
			<div className="row">
				<div className="col-sm-4">
					<img className='img-rounded img-responsive' src={this.state.imageURI} />
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label>Title</label>
						<input 
							className="form-control" 
							value={this.state.title} 
							onChange={this.handleChange.bind(this)} 
							type="text"
							name="title"/>
					</div>
					<div className="form-group">
						<label>Description</label>
						<input 
							className="form-control" 
							value={this.state.description}
							onChange={this.handleChange.bind(this)} 
							type="text"
							name="description"/>
					</div>
					<div className="form-group">
						<label>Image</label>
						{this.renderImage()}
						<input 
							className="form-control"
							onChange={this.handleFile.bind(this)}
							type="file"
							name="image" />
					</div>

					{this.renderErrorMessage()}

					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { user: state.user, submission: state.submission };
}

export default connect(mapStateToProps, actions)(Submit);
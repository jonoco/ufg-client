import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

class Home extends Component {
	componentWillMount() {
		if (this.props.user.token) {
			browserHistory.push('/user');
		}
	}

	componentDidUpdate() {
		if (this.props.user.token) {
			browserHistory.push('/user');
		}
	}

	render() {
		return (
			<div className='container'>
				<div className='jumbotron'>
					<h1>Up For Grabs!</h1>
					<p>The place to go for things you didn't know you needed</p>
					<p>
						<Link to="/signup" className='btn btn-primary'>Sign up</Link>
						<Link to="/login" className='btn btn-default'>Log in</Link>
					</p>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { user : state.user };
}

export default connect(mapStateToProps)(Home);
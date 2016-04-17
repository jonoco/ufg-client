import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Home extends Component {
	componentWillMount() {
		if (!this.props.token) {
			browserHistory.push('/login');
		}
	}

	render() {
		return (
			<div>
				<div>this is authorized, hurrah!!</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { token : state.token };
}

export default connect(mapStateToProps)(Home);
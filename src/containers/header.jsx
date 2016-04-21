import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
	renderLoginButton() {
		if (this.props.user.token) {
			return <button onClick={this.props.logout} className="btn btn-default navbar-btn">Log out</button>
		} else {
			return <Link to="/login" className="btn btn-default navbar-btn">Log in</Link>
		}
	}

	renderUsername() {
		if (this.props.user.username) {
			return <p className="navbar-text navbar-right">{this.props.user.username}</p>;
		}
	}

	render() {
		return(
			<nav className="navbar navbar-default">
				<div className="container">
					<Link to="/" className="navbar-brand">UFG</Link>
					{this.renderLoginButton()}
					{this.renderUsername()}
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps, actions)(Header);
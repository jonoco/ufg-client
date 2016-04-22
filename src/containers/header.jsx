import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
	renderLinks() {
		if (this.props.user.token) {
			return (
				<ul className="nav navbar-nav">
					<li><Link to="/user">Item list</Link></li>
					<li><Link to="/submit">Post item</Link></li>
					<li><a onClick={this.props.logout}>Log out</a></li>
				</ul>
			);
		} else {
			return <Link to="/login">Log in</Link>
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
					{this.renderLinks()}
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
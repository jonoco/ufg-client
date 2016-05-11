import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
	renderLinks() {
		if (this.props.user.token) {
			return (
				<div>
					<ul className="nav navbar-nav">
						<li><Link className="btn" to="/items">Item list</Link></li>
						<li><Link className="btn" to="/submit">Post item</Link></li>
						<li><Link className="btn" to="/friends">Friends</Link></li>
						<li><Link className="btn" to="/notifications">Notifications</Link></li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<li><Link className="btn" to="/user">{this.props.user.username}</Link></li>
						<li><a className="btn" onClick={this.props.logout}>Log out</a></li>
					</ul>
				</div>
			);
		}
	}

	render() {
		return(
			<nav className="navbar navbar-default">
				<div className="container">
					<Link to="/" className="navbar-brand">UFG</Link>
					{this.renderLinks()}
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps, actions)(Header);
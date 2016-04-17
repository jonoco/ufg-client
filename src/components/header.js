import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
	render() {
		return(
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<Link to="/" className="navbar-brand">UFG</Link>
				</div>
			</nav>
		);
	}
}

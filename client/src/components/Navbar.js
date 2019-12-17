import React, { Component } from 'react'

export default class Navbar extends Component {
	render() {
		return (
		<nav className="navbar navbar-dark bg-primary">
			<a href="/" className="navbar-brand">App</a>

			<form action="/" className="form-inline">
				<div className="input-group">
					<input type="text" className="form-control"/>
					<ul className="navbar-nav ml-auto"></ul>
					<div className="input-group-append"><button className="btn btn-dark"><span><i className="fas fa-search"></i></span></button></div>
				</div>
			</form>
		</nav>
		)
	}
}

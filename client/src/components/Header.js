
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React, { Component } from 'react'

class Header extends Component {

	renderLinks = () => {
		// if (this.props.isAuthenticated && this.props.token) {
			return (
				<div>
					<Link to="/signout">Sign Out</Link>
					<Link to="/feature">Feature</Link>
				{/* </div> */}
			{/* ); */}
		{/* } else { */}
			{/* return ( */}
				{/* <div> */}
					<Link to="/signup">Sign Up</Link>
					<Link to="/signin">Sign In</Link>
				</div>
			);
		}
	// }
	render() {
		return (
			<div className='header'>
		{	this.renderLinks()}
			</div>
		)
	}
}
const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, token: state.auth.token})
export default connect(mapStateToProps)(Header)
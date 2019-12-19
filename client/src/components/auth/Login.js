import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {registerUser} from '../../store/actions/auth.actions.js';



class Login extends Component {
	render () {
		return (
			<>
				<h2>Login To Your Account</h2>
				<form>
					<fieldset>
						<label htmlFor="Email">Email</label>
					</fieldset>
					<fieldset>
						<label htmlFor="Password">Password</label>
					</fieldset>
				</form>
			</>
		)
	}
}
export default Login
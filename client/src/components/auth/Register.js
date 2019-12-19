import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../../store/actions/auth.actions.js';

class Signup extends Component {
	state = {
		email: "",
		password: ""
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.userPostFetch(this.state)
	}

	render () {
		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Sign Up For An Account</h1>

				<label>Email</label>
				<input
					name='email'
					placeholder='Username'
					value={this.state.email}
					onChange={this.handleChange}
				/><br />

				<label>Password</label>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={this.state.password}
					onChange={this.handleChange}
				/><br />

				<input type='submit' />
			</form>
		)
	}
}



export default connect(null, {registerUser})(Signup);
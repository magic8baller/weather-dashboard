import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {registerUser} from '../../store/actions/auth.actions.js';
import {Field, reduxForm} from 'redux-form';



class Register extends Component {
	render () {
		return (
			<>
				<h2>Register An Account</h2>
				<form>
					<fieldset>
						<label htmlFor="Email">Email: </label>
						<Field
							name='email'
							type='text'
							component='input'
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="Password">Password: </label>
						<Field
							name='password'
							type='password'
							component='input'
						/>
					</fieldset>
				</form>
			</>
		)
	}
}
export default reduxForm({form: 'register'})(Register)
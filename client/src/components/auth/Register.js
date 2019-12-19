import React, {Component} from 'react';
import {compose} from 'redux';
import {Field, reduxForm} from 'redux-form';
import {registerUser} from '../../store/actions/auth.actions.js';
import {connect} from 'react-redux';
class Register extends Component {

	onSubmit = formProps => {
		// this.props.registerUser(formProps)
		console.log(formProps)
	}
	render () {
		const {handleSubmit} = this.props
		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>
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
				<button>Submit</button>
			</form>

		)
	}
}

export default compose(
	connect(null, {registerUser}),
	reduxForm({form: 'register'})

)(Register)
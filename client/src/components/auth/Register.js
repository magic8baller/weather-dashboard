import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Field, reduxForm} from 'redux-form';
import {setEmail, setName} from '../../store/actions'
import {registerUser} from '../../store/actions/auth.actions.js';
class Register extends Component {

	onSubmit = formProps => {
		this.props.registerUser(formProps, () => {
			this.props.setName(formProps.name)
			this.props.setEmail(formProps.email)
			this.props.history.push('/')
		})
		console.log(formProps)
	}
	render () {
		const {handleSubmit} = this.props
		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>
				<fieldset>
					<label htmlFor="Name">Name: </label>
					<Field
						name='name'
						type='text'
						component='input'
					/>
				</fieldset>
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
				<div>{this.props.errorMessage}</div>
				<button>Sign Up!</button>
			</form>

		)
	}
}
const mapStateToProps = state => ({errorMessage: state.auth.errorMessage})
export default compose(
	connect(mapStateToProps, {registerUser, setName, setEmail}),
	reduxForm({form: 'register'})

)(Register)
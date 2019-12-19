import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';



class Register extends Component {

	onSubmit = formProps => {
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
export default reduxForm({form: 'register'})(Register)
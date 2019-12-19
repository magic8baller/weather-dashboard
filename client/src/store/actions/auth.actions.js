import {authConstants} from '../constants'
import axios from 'axios'
const {AUTHENTICATE_USER, AUTHENTICATE_ERROR, LOGOUT_USER} = authConstants
export const registerUser = (formProps, callback) => async dispatch => {
	try {
		const registerResponse = await axios.post('http://localhost:3000/register', formProps)
		dispatch({type: AUTHENTICATE_USER, payload: registerResponse.data.token})
		localStorage.setItem('token', registerResponse.data.token)
		callback()

	} catch (e) {
		dispatch({type: AUTHENTICATE_ERROR, payload: 'Email is already registered'})
	}
}

export const loginUser = (formProps, callback) => async dispatch => {

	try {
		const loginResponse = await axios.post('http://localhost:3000/login', formProps)
		dispatch({type: AUTHENTICATE_USER, payload: loginResponse.data.token})
		localStorage.setItem('token', loginResponse.data.token)
		callback()
	} catch (e) {
		dispatch({type: AUTHENTICATE_ERROR, payload: 'Invalid login credentials'})
	}
}

export const logout = () => {
	localStorage.removeItem('token')

	return {type: LOGOUT_USER, payload: ''}
}
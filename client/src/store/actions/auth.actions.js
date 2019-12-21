import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {setAuthToken} from '../../utils/setAuthToken.js'
import {authConstants} from '../constants'
const {SET_CURRENT_USER, AUTHENTICATE_ERROR, LOGOUT_USER} = authConstants
export const registerUser = (formProps, callback) => async dispatch => {
	try {
		const registerResponse = await axios.post('http://localhost:8080/register', formProps)

		const {token} = registerResponse.data
		localStorage.setItem('token', token)
		setAuthToken(token)
		const decoded = jwt_decode(token)
		dispatch(setCurrentUser(decoded))
		callback()

	} catch (e) {
		dispatch({type: AUTHENTICATE_ERROR, payload: 'Email is already registered'})
	}
}

export const loginUser = (formProps, callback) => async dispatch => {

	try {
		const loginResponse = await axios.post('http://localhost:8080/login', formProps)
		const {token} = loginResponse.data
		localStorage.setItem('token', token)
		setAuthToken(token)
		const decoded = jwt_decode(token)
		dispatch(setCurrentUser(decoded))
		callback()
	} catch (e) {
		dispatch({type: AUTHENTICATE_ERROR, payload: 'Invalid login credentials'})
	}
}

export const logoutUser = () => dispatch => {
	localStorage.removeItem('token')
	setAuthToken(false)
	dispatch(setCurrentUser({}))
	// return {type: LOGOUT_USER, payload: ''}
}
export const meFromToken =(storedToken) => async (dispatch)=> {
	const request = await axios({
		method: 'get',
		url: `http://localhost:8080/me?token=${storedToken}`,
		headers: {
			'Authorization': `Bearer ${storedToken}`
		}
	});
		dispatch({type: 'ME_FROM_TOKEN', payload: request})
}
export function meFromTokenSuccess (currentUser) {
	return {
		type: 'ME_FROM_TOKEN_SUCCESS',
		payload: currentUser
	};
}

export function meFromTokenFailure (error) {
	return {
		type: 'ME_FROM_TOKEN_FAILURE',
		payload: error
	};
}
export const setCurrentUser = decoded => {
	return {type: SET_CURRENT_USER, payload: decoded}
}
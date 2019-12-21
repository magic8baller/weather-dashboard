import {isEmpty} from '../../validation/is-empty.js'
import {authConstants} from '../constants'
const {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_USER, SET_CURRENT_USER} = authConstants

const initialState = {
	authToken: localStorage.getItem('token'),
	isAuthenticated: false,
	errorMessage: '',
	user: {},
	isLoading: false
}
export default (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false
			}

		case REGISTER_FAIL:
			localStorage.removeItem('token')
			return {
				...state,
				authToken: null,
				isAuthenticated: false,
				user: null,
				error: action.payload,
				isLoading: false
			}

		case SET_CURRENT_USER:
			return {...state, isAuthenticated: !isEmpty(action.payload), user: action.payload, authToken: action.payload.token}

		case USER_LOADING:
			return {...state, isLoading: true}

		case AUTH_ERROR:
			localStorage.removeItem('token')
			return {...state, isAuthenticated: false, authToken: null, errorMessage: action.payload, user: null, isLoading: false}

		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false
			}

		case LOGIN_FAIL:
			localStorage.removeItem('token')
			return {
				...state,
				authToken: null,
				isAuthenticated: false,
				user: null,
				error: action.payload,
				isLoading: false
			}
		case LOGOUT_USER:
			localStorage.removeItem('token')
			return {...state, isAuthenticated: false, authToken: null, user: null, isLoading: false}

		default:
			return state;
	}
}

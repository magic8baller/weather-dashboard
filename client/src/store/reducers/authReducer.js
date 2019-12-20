import {isEmpty} from '../../validation/is-empty.js'
import {authConstants} from '../constants'
const {AUTHENTICATE_USER, AUTHENTICATE_ERROR, LOGOUT_USER, SET_CURRENT_USER} = authConstants

const initialState = {
	isAuthenticated: false,
	errorMessage: '',
	user: {}
}
export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {...state, isAuthenticated: !isEmpty(action.payload), user: action.payload}
		// case AUTHENTICATE_USER:
		// 	return {...state, isAuthenticated: true, authToken: action.payload, errorMessage: ''}
			case AUTHENTICATE_ERROR:
			return {...state, isAuthenticated: false, errorMessage: action.payload}
			case LOGOUT_USER:
				return {...state, isAuthenticated: false, authToken: action.payload}
		default:
			return state;
	}
}

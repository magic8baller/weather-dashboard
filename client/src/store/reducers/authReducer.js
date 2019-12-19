import {authConstants} from '../constants'
const {AUTHENTICATE_USER, AUTHENTICATE_ERROR, LOGOUT_USER} = authConstants
const inititalState = {
	isAuthenticated: false,
	authToken: '',
	errorMessage: ''
}
export default (state = inititalState, action) => {
	switch (action.type) {
		case AUTHENTICATE_USER:
			return {...state, isAuthenticated: true, authToken: action.payload}
			case AUTHENTICATE_ERROR:
				return {...state, isAuthenticated: false, errorMessage: action.payload}
			case LOGOUT_USER:
				return {...state, isAuthenticated: false, authToken: action.payload}
		default:
			return state;
	}
}

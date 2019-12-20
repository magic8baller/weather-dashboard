const initialState = {name: '', email: '', password: ''}
export default (state = initialState, action) => {
	switch (action.type) {

		case 'SET_NAME':
			return {...state, name: action.payload}
		case 'SET_EMAIL':
			return {...state, email: action.payload}
		case 'SET_PASSWORD':
			return {...state, password: action.payload}
		case 'GET_NAME':
			return {...state, name: action.payload}
		default:
			return state;
	}
}
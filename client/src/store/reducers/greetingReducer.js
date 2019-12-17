export default (state = {name: ''}, action) => {
	if (action.type === 'SET_NAME') {
		return {...state, name: action.payload}
	}
	return state;
}
import {GET_CURRENT_WEATHER} from '../actions/actionTypes'
const initialState = {
	currentWeather: null,
	loading: false,
	error: false
}

const weatherReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CURRENT_WEATHER:
			return {
				...state,
				currentWeather: {...state.currentWeather, ...action.payload}
			}
		default:
			return state;
		}
	}

	export default weatherReducer
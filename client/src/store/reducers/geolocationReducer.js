import {GET_GEOLOCATION} from '../actions/actionTypes'

const initialState = {
	coords: {longitude: '18.06324', latitude: '59.334591'},
	hasFetchedLocation: false
}

const geolocationReducer = (state = initialState, action) => {

	switch(action.type) {
		case GET_GEOLOCATION:
			return {
				...state,
				coords: action.payload,
				hasFetchedLocation: true
			}
		default:
			return state
	}
}

export default geolocationReducer
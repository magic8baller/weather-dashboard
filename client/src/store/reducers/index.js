import {combineReducers} from 'redux'
import weatherReducer from './weatherReducer'
import authReducer from './authReducer'
import geolocationReducer from './geolocationReducer'
import greetingReducer from './greetingReducer'
export default combineReducers({
	hello: () => 123,
	weather: weatherReducer,
	auth: authReducer,
	position: geolocationReducer,
	greeting: greetingReducer
})
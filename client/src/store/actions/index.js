import axios from 'axios';
import {GEOLOCATION_DENIED, GET_CURRENT_WEATHER, GET_GEOLOCATION} from './actionTypes';
const {REACT_APP_OPEN_WEATHER_KEY} = process.env;
const API = 'http://api.openweathermap.org/data/2.5/weather';


export const getGeolocation = () => async dispatch => {
	navigator.geolocation.getCurrentPosition(position => {
		dispatch({type: GET_GEOLOCATION, payload: position.coords})
	},
		error => {
			if (error.code === 1) {
				dispatch({type: GEOLOCATION_DENIED, payload: false})
			}
		})
}

export const fetchCurrentWeather = ({latitude, longitude}) => async (dispatch) => {
	try {
		let weatherResponse = await axios.get(`${API}?lat=${latitude}&lon=${longitude}&cnt=10&appid=${REACT_APP_OPEN_WEATHER_KEY}&units=imperial`)
		dispatch({type: GET_CURRENT_WEATHER, payload: weatherResponse.data})
	} catch (err) {
		console.error(err)
	}
}

export const setName = (name) => dispatch => dispatch({type: 'SET_NAME', payload: name})
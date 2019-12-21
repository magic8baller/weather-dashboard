import axios from 'axios';
import {GEOLOCATION_DENIED, GET_CURRENT_WEATHER, GET_GEOLOCATION} from './actionTypes';
const {REACT_APP_OPEN_WEATHER_KEY} = process.env;
const API = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather';


export const getGeolocation = () => dispatch => {

		navigator.geolocation.getCurrentPosition(pos => {
			// const lon = pos.coords.longitude.toFixed(5);
			// const lat = pos.coords.latitude.toFixed(5);

			dispatch({
				type: GET_GEOLOCATION,
				payload: pos.coords
			});
		});

}

export const fetchCurrentWeather = ({latitude, longitude}) => async (dispatch) => {
	try {
		let weatherResponse = await axios.get(`${API}?lat=${latitude}&lon=${longitude}&cnt=10&appid=${REACT_APP_OPEN_WEATHER_KEY}&units=imperial`)
		// localStorage.setItem('coords', JSON.stringify({latitude, longitude}))
		// localStorage.setItem('weather', JSON.stringify(weatherResponse.data))
		dispatch({type: GET_CURRENT_WEATHER, payload: weatherResponse.data})
	} catch (err) {
		console.error(err)
	}
}

export const setName = (name) => (dispatch, getState) => {
	// localStorage.setItem('name', JSON.stringify(name))
	const {name} = getState().auth.user.user
	dispatch({type: 'SET_NAME', payload: name})}
export const setEmail = email => dispatch => dispatch({type:'SET_EMAIL', payload: email})
export const setPassword = password => dispatch => dispatch({type:'SET_PASSWORD', payload: password})

export const getName = () => async (dispatch, getState) => {
	const {name} = getState().auth.user.user

dispatch({type: 'GET_NAME', payload: name})

}
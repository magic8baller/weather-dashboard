import axios from 'axios';
import {GEOLOCATION_DENIED, GET_CURRENT_WEATHER, GET_GEOLOCATION} from './actionTypes';
import {weatherAPI} from '../../API'
const {REACT_APP_OPEN_WEATHER_KEY} = process.env;
const {baseURL} = weatherAPI
const API = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather';


export const getGeolocation = () => async dispatch => {
	navigator.geolocation.getCurrentPosition(position => {
		// localStorage.setItem('coords', JSON.stringify(position.coords))
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
		// localStorage.setItem('coords', JSON.stringify({latitude, longitude}))
		// localStorage.setItem('weather', JSON.stringify(weatherResponse.data))
		dispatch({type: GET_CURRENT_WEATHER, payload: weatherResponse.data})
	} catch (err) {
		console.error(err)
	}
}

export const setName = () => (dispatch, getState) => {
	let user = getState().auth.user.user
	localStorage.setItem('name', JSON.stringify(user.name))
	dispatch({type: 'SET_NAME', payload: user.name})}
export const setEmail = email => dispatch => dispatch({type:'SET_EMAIL', payload: email})
export const setPassword = password => dispatch => dispatch({type:'SET_PASSWORD', payload: password})

export const getName = (email) => async dispatch => {
// let getEmail =axios.get('http://localhost:8080/')
dispatch({type: 'GET_NAME', payload: localStorage.getItem('name')})

}
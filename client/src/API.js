import axios from 'axios'
const {REACT_APP_OPEN_WEATHER_KEY} = process.env
export const weatherAPI = axios.create({
	baseURL: 'http://api.openweathermap.org/data/2.5/',
	params: {
		APPID: REACT_APP_OPEN_WEATHER_KEY
	}
})
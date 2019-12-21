import axios from 'axios'
const {REACT_APP_OPEN_WEATHER_KEY} = process.env
export const weatherAPI = axios.create({
	baseURL: 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/',

})
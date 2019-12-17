import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchCurrentWeather} from '../store/actions'
class Weather extends Component {

	componentDidMount() {
		this.props.fetchCurrentWeather(this.props.position)
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.position !== prevProps.position) {
			this.props.fetchCurrentWeather(this.props.position)
		}
	}

	renderCurrentWeather = () => {
		const {currentWeather} = this.props
		if (currentWeather) {
			const {main: {temp, temp_min, temp_max, pressure, humidity},clouds, wind, weather, name} = currentWeather
				return (
			<div className="text-white bg-danger">
				<h3 className="text-center text-capitalize">{name}</h3>
						<h1><img src={`http://openweathermap.org/img/w/${
							weather[0].icon
							}.png`} alt='weather icon'/>{temp.toFixed(0)}&deg;</h1>
							<h2 className="text-center text-capitalize">{weather[0].description}</h2>
							<p className="text-center">
								Wind {wind.speed} m/s<br/>Humidity {humidity} %<br/>Pressure {pressure} hPa<br/>Cloudiness {clouds.all} %
							</p>
			</div>
		)
		} else {
			return (<h1>Loading...</h1>)
		}

	}
	render() {
		return (
			<div>
{this.renderCurrentWeather()}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({position: state.position.coords, currentWeather: state.weather.currentWeather})

export default connect(mapStateToProps, {fetchCurrentWeather})(Weather)

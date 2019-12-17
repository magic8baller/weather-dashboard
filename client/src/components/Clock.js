import React, { Component } from 'react'

export default class Clock extends Component {
	state = {
		date: new Date()
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timerID)
	}

	tick = () => {
		this.setState({date: new Date()})
	}

	render() {
		return (
			<div>
<h1 className='text-center'>{this.state.date.toLocaleTimeString()}</h1>
			</div>
		)
	}
}

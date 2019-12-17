import React, {Component} from 'react'
import {getGreeting} from '../utils'
import {connect} from 'react-redux'
class Greeting extends Component {

	state = {
		greeting: getGreeting()
	}

	updateGreeting = () => {
		this.setState({greeting: getGreeting()})
	}

	componentDidMount () {
		this.timerId = setInterval(() => {this.updateGreeting()}, 2000)
	}

	componentWillUnmount() {
		clearInterval(this.timerId)
	}



	render () {
		return (
			<div>
{this.state.greeting} {this.props.name}!
			</div>
		)
	}
}
const mapStateToProps = state => ({name: state.greeting.name})
export default connect(mapStateToProps)(Greeting)
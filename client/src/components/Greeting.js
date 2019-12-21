import React, {Component} from 'react'
import {getGreeting} from '../utils'
import {getName} from '../store/actions'
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
		// const storedName = localStorage.getItem('name')
		// this.props.getName()
		return (
			<div>
{this.state.greeting} {this.props.name}!
			</div>
		)
	}
}
const mapStateToProps = state => ({name: state.auth.user.user.name})
export default connect(mapStateToProps)(Greeting)
import StyledGreeting from './StyledGreeting'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setName} from '../../store/actions'
class Greeter extends Component {

	state = {name: ''}
	handleChange = e => {
	this.setState({ name: e.target.value });
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.setName(this.state.name)

	}
	render() {
		return (
			<div>
				<StyledGreeting value={this.state.name} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
			</div>
		)
	}
}
const mapStateToProps = state => ({name: state.greeting.name})
export default connect(mapStateToProps, {setName})(Greeter)
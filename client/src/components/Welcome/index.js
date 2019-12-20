import React, {Component} from 'react';
import Dashboard from '../Dashboard'
import Clock from '../Clock'
import Navbar from '../Navbar'
import Greeting from '../Greeting'
import WelcomeMain from './WelcomeMain'
// import Greeter from './Greeter'
import {connect} from 'react-redux'


class Welcome extends Component {


	render () {
		// const storedName = localStorage.getItem('name')
		return (<div>

			{this.props.isAuthenticated ? <>
				<Clock />
				<Greeting />
				<Dashboard /></> : <WelcomeMain />}

		</div>);
	}

}

const mapStateToProps = (state) => ({isAuthenticated: state.auth.isAuthenticated})

export default connect(mapStateToProps)(Welcome);

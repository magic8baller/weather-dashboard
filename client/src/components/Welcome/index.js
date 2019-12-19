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
		const storedName = localStorage.getItem('name')
		return (<div>

			{storedName ? <>
				<Clock />
				<Greeting />
				<Dashboard /></> : <WelcomeMain />}

		</div>);
	}

}

const mapStateToProps = (state) => ({name: state.greeting.name})

export default connect(mapStateToProps)(Welcome);

import React, {Component} from 'react';
import Dashboard from './Dashboard'
import Clock from './Clock'
import Navbar from './Navbar'
import Greeting from './Greeting'

import Greeter from './Greeter'
import {connect} from 'react-redux'
import Header from './Header'

class App extends Component {


  render() {
		const storedName = localStorage.getItem('name')
    return (<div>
			{storedName ? <>
				<Header />
			<Clock />
			<Greeting />
			<Dashboard /></> : <Greeter />}

    </div>);
  }

}

const mapStateToProps = (state) => ({name: state.greeting.name})

export default connect(mapStateToProps)(App);

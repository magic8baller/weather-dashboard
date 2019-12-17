import React from 'react';
import Dashboard from './Dashboard'
import Clock from './Clock'
import Navbar from './Navbar'
import Greeting from './Greeting'
import Greeter from './Greeter'
import {connect} from 'react-redux'

function App(props) {
  return (
    <div>
			{props.name ? (<>

			<Clock />
			<Greeting />
			<Dashboard /></>) : <Greeter/>}

    </div>
  );
}

const mapStateToProps = (state) => ({name: state.greeting.name})

export default connect(mapStateToProps)(App);

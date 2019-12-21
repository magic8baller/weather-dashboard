import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGeolocation} from '../store/actions'
import {loadUser} from '../store/actions/auth.actions'
import Clock from './Clock'
import Greeting from './Greeting'
import Weather from './Weather'
import TodoContainer from './Todo/TodoContainer'
class Dashboard extends Component {

componentDidMount() {
	// this.props.loadUser()
this.props.getGeolocation()

}



  render() {

    return (<div>
			<Clock />
			<Greeting />
		<Weather/>
<TodoContainer />
		</div>);
  }

}
const mapStateToProps = state => ({position: state.position.coords})
export default connect(mapStateToProps, {getGeolocation, loadUser})(Dashboard)

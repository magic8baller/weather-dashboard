import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGeolocation} from '../store/actions'
import Clock from './Clock'
import Greeting from './Greeting'
import Weather from './Weather'
class Dashboard extends Component {

componentDidMount() {
this.props.getGeolocation()

}



  render() {

    return (<div>
			<Clock />
			<Greeting />
		<Weather/>

		</div>);
  }

}
const mapStateToProps = state => ({position: state.position.coords})
export default connect(mapStateToProps, {getGeolocation})(Dashboard)

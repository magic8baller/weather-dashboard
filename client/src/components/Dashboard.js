import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGeolocation} from '../store/actions'
import Weather from './Weather'
class Dashboard extends Component {

componentDidMount() {
this.props.getGeolocation()

}



  render() {

    return (<div>
		<Weather/>

		</div>);
  }

}
const mapStateToProps = state => ({position: state.position.coords})
export default connect(mapStateToProps, {getGeolocation})(Dashboard)

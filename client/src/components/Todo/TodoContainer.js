import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import TodoForm from './TodoForm';
// import TodoFeed from './TodoFeed';
// import Spinner from '../common/Spinner';
import {fetchTodos} from '../../store/actions/todo.actions.js';
class TodoContainer extends Component {
	componentDidMount() {
		this.props.fetchTodos()
	}
	render() {
		return (
			<div>

			</div>
		)
	}
}
export default connect(null, {fetchTodos})(TodoContainer
)
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TodoForm from './TodoForm';
import TodoFeed from './TodoFeed';
import Spinner from '../common/Spinner';
import {getTodos} from '../../actions/todo.actions';
class TodoContainer extends Component {
	render() {
		return (
			<div>

			</div>
		)
	}
}
export default TodoContainer

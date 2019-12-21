import axios from 'axios'
import {todoConstants} from '../constants'
import setAuthToken from '../../utils/setAuthToken.js'
const {FETCH_TODOS,
	ADD_TODO,
	DELETE_TODO,
	EDIT_TODO,
	EDIT_TODO_FAIL,
	SET_CURRENT_TODO,
	CLEAR_CURRENT_TODO,
	SET_CLICKED_TODO,
	CLEAR_CLICKED_TODO,
	SET_TODO_COMPLETE,
	UNSET_TODO_COMPLETE,
	TODOS_LOADING,
	SINGLE_TODO_LOADING,
	FETCH_TODOS_FAIL,
	DELETE_TODO_FAIL,
	ADD_TODO_FAIL,
	SET_TODO_COMPLETE_FAIL,
	UNSET_TODO_COMPLETE_FAIL} = todoConstants
const API = 'https://cors-anywhere.herokuapp.com/http://localhost:8080/api/todos'

export const fetchTodos = () => async dispatch => {
	dispatch({ type: TODOS_LOADING})
	try {
	const fetchAllTodosResponse = await axios.get(API)
	dispatch({ type:FETCH_TODOS, payload: fetchAllTodosResponse.data})

	} catch (e) {
		console.error(e)
dispatch({ type:FETCH_TODOS_FAIL, payload: e.message})
	}
}

export const createTodo = (formProps) => async dispatch => {
	dispatch({ type: SINGLE_TODO_LOADING})
	try {
	const createTodoResponse = await axios.post(API, formProps)
	dispatch({ type:ADD_TODO, payload: createTodoResponse.data})

	} catch (e) {
		console.error(e)
dispatch({ type:ADD_TODO_FAIL, payload: e.message})
	}
}

export const updateTodo = (todo) => async dispatch => {
dispatch({ type: SINGLE_TODO_LOADING})
try {
const updateTodoResponse = await axios.put(`${API}/${todo._id}`, todo)
dispatch({ type:EDIT_TODO, payload: updateTodoResponse.data})
} catch (e) {
console.error(e)
dispatch({ type:EDIT_TODO_FAIL, payload:e.message})
}
}

export const deleteTodo = (id) => async dispatch => {
	dispatch({ type: SINGLE_TODO_LOADING})
	try {
	await axios.delete(`${API}/${id}`)
	dispatch({type: DELETE_TODO, payload:id})
	} catch (e) {
console.error(e)
dispatch({type: DELETE_TODO_FAIL, payload: e.message})
	}
}

export const setCurrentTodo = id => dispatch => {
	dispatch({ type:SET_CURRENT_TODO, payload: id})
}

export const clearCurrentTodo = () => dispatch => {
	dispatch({type: CLEAR_CURRENT_TODO})
}

export const setClickedTodo = id => dispatch => {
	dispatch({type: SET_CLICKED_TODO, payload: id})
}

export const clearClickedTodo = () => dispatch => {
	dispatch({type: CLEAR_CLICKED_TODO})
}

export const setTodoComplete = id => async (dispatch, getState) => {
	dispatch({
		type: SINGLE_TODO_LOADING
	})
	try {
		const currentSelectedTodo = getState().todos.todos.find(
			todo => todo._id === id
		)
		const completedTodo = {...currentSelectedTodo, isCompleted: true}

		const res = await axios.patch(`/todos/${id}`, completedTodo)

		dispatch({type: SET_TODO_COMPLETE, payload: res.data})
	} catch (error) {
		dispatch({type: SET_TODO_COMPLETE_FAIL, payload: error.message})
	}
}

export const unsetTodoComplete = id => async (dispatch, getState) => {
	dispatch({
		type: SINGLE_TODO_LOADING
	})
	try {
		const currentSelectedTodo = getState().todos.todos.find(
			todo => todo._id === id
		)

		const uncompletedTodo = {...currentSelectedTodo, isCompleted: false}

		const res = await axios.patch(`/todos/${id}`, uncompletedTodo)

		dispatch({type: UNSET_TODO_COMPLETE, payload: res.data})
	} catch (error) {
		dispatch({type: UNSET_TODO_COMPLETE_FAIL, payload: error.message})
	}
}

import axios from 'axios'

const url = 'http://localhost:8080/todos/'
export const addTodo = todoData => async (dispatch) => {
	try {
		let createTodoResponse = await axios.post(url, todoData)
		dispatch({type: 'ADD_TODO', payload: createTodoResponse.data})
	} catch (e) {
		console.log(e.message)
	}
}

export const getTodos = () => async (dispatch) => {
	try {

		let getAllTodosResponse = await axios.get(url)
		dispatch({type: 'GET_TODOS', payload: getAllTodosResponse.data})
	} catch (e) {
		console.error(e.message)
	}
}

export const getTodo = id => async (dispatch) => {
	try {
		let getTodoResponse = await axios.get(url + id)
		dispatch({type: 'GET_TODO', payload: getTodoResponse.data})
	} catch (e) {
		console.error(e.message)
	}
}

export const updateTodo = (id, formProps) => async (dispatch) => {
	try {
		let updateTodoResponse = await axios.put(url + id, formProps)
		dispatch({type: 'UPDATE_TODO', payload: updateTodoResponse.data})
	} catch (e) {
		console.error(e.message)
	}
}

export const removeTodo = id => (dispatch) => {
	try {
		await axios.delete(url + id)
		dispatch({type: 'DELETE_TODO', payload: id})
	} catch (e) {
		console.error(e.message)
	}
}
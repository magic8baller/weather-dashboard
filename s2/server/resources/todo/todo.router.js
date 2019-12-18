const {getAll, createOne, getOne, updateOne, removeOne} = require('./todo.controller')
const express = require('express');
const todoRouter = express.Router()
const {check, validationResult} = require('express-validator/check');
todoRouter.route('/')
.get(getAll)
	.post(createOne, [
		check('text', 'Text is required')
			.not()
			.isEmpty()
	],)

todoRouter.route('/:id')
.get(getOne)
.put(updateOne)
.delete(removeOne)

module.exports = todoRouter
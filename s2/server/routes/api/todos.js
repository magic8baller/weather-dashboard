const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Todo = require('../../models/Todo');
const User = require('../../models/User');

// @route    todo api/todos
// @desc     Create a todo
// @access   Private
router.post(
	'/',
	[
		auth,
		[
			check('text', 'Text is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newTodo = new Todo({
				text: req.body.text,
				user: req.user.id
			});

			const todo = await newTodo.save();
			if (!todo) {
				return res.status(404).send({message: 'Todo could not be saved', success: false})
			}
			res.json({data: todo, success: true});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET api/todos
// @desc     Get all todos
// @access   Private
router.get('/', auth, async (req, res) => {

	try {
		const todos = await Todo.find().sort({date: -1});
		if (!todos) {
			return res.status(404).json({message: 'No todos found in database', success: false})
		}
		res.status(200).json({data: todos, success: true});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
}
);

// @route    PUT api/todos/:id
// @desc     Update todo by ID
// @access   Private

router.put('/:id', auth, async (req, res) => {
	try {
		const newTodoBody = {
			user: req.user.id,
			...req.body
		}

		const updatedTodo = await Todo
			.findByIdAndUpdate(req.params.id,
				newTodoBody,
				{new: true}
			)

		// Check for ObjectId format and todo
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !updatedTodo) {
			return res.status(404).json({message: 'Todo not found', success: false});
		}
		res.status(200).json({data: updatedTodo, success: true})


	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
})

// @route    GET api/todos/:id
// @desc     Get todo by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);

		// Check for ObjectId format and todo
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
			return res.status(404).json({message: 'todo not found', success: false});
		}

		res.status(200).json({data: todo, success: true});
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/todos/:id
// @desc     Delete a todo
// @access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);

		// Check for ObjectId format and todo
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
			return res.status(404).json({message: 'todo not found', success: false});
		}

		// Check user
		if (todo.user.toString() !== req.user.id) {
			return res.status(401).json({message: 'User not authorized', success: false});
		}

		await todo.remove();

		res.json({message: 'todo removed', success: true});
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});



module.exports = router;

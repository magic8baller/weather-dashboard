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

			res.json(todo);
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
		res.json(todos);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/todos/:id
// @desc     Update todo by ID
// @access   Private

router.put('/:id', auth, async (req, res) => {
	try {
		const updatedTodo = await Todo
			.findOneAndUpdate(
				{
					user: req.user.id,
					_id: req.body.id
				},
			req.body,
				{new: true}
			)

		// Check for ObjectId format and todo
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !updatedTodo) {
			return res.status(404).json({msg: 'Todo not found'});
		}
		res.status(200).json({data: updatedTodo})


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
			return res.status(404).json({msg: 'todo not found'});
		}

		res.json(todo);
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
			return res.status(404).json({msg: 'todo not found'});
		}

		// Check user
		if (todo.user.toString() !== req.user.id) {
			return res.status(401).json({msg: 'User not authorized'});
		}

		await todo.remove();

		res.json({msg: 'todo removed'});
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});



module.exports = router;

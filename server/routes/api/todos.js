const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');

const Todo = require('../../models/Todo');

const User = require('../../models/User');

// @route    POST api/todos
// @desc     Create a post
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
// @desc     Update post by ID
// @access   Private

router.put('/:id', auth, async (req, res) => {
	try {
		const updatedTodo = await Todo
			.findOneAndUpdate(
				{
					user: req.user.id,
					id: req.params.id
				},
			req.body,
				{new: true}
			)

		// Check for ObjectId format and post
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
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Todo.findById(req.params.id);

		// Check for ObjectId format and post
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
			return res.status(404).json({msg: 'Post not found'});
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/todos/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Todo.findById(req.params.id);

		// Check for ObjectId format and post
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
			return res.status(404).json({msg: 'Post not found'});
		}

		// Check user
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({msg: 'User not authorized'});
		}

		await post.remove();

		res.json({msg: 'Post removed'});
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});



module.exports = router;

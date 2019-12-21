const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.js');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('./user/user.model');

// @route    GET /me
// @desc     Test route
// @access   Public
router.get('/me', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
	'/login',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}

		const {email, password} = req.body;

		try {
			let user = await User.findOne({email});

			if (!user) {
				return res
					.status(400)
					.json({errors: [{msg: 'Invalid Credentials'}]});
			}

			const isMatch = await user.checkPassword(password);

			if (!isMatch) {
				return res
					.status(400)
					.json({errors: [{msg: 'Invalid Credentials'}]});
			}

			const payload = {
				user: {
					id: user.id,
					name: user.name,
					email: user.email
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{expiresIn: 360000},
				(err, token) => {
					if (err) throw err;
					console.log(token)
					res.json({payload, token});
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;

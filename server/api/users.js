const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
	'/',
	[

		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({min: 6})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}

		const {name, email, password} = req.body;

		try {
			let user = await User.findOne({email});

			if (user) {
				return res
					.status(400)
					.json({errors: [{msg: 'User already exists'}]});
			}


			user = new User({
				email,
				password
			});


			await user.save();

			const payload = {
				user: {
					id: user.id, email: user.email, name: user.name
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{expiresIn: 360000},
				(err, token) => {
					if (err) throw err;
					console.log(token)
					res.json({payload,token});
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;

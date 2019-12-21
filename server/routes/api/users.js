const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('../../resources/user/user.model.js');




// @route    POST /register
// @desc     Register user
// @access   Public
router.post(
	'/register',
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
				name, email,
				password
			});


			await user.save();

			const payload = {
				user: {
					id: user.id,
					name: user.name, email: user.email
				}
			};

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{expiresIn: '1d'},
				(err, token) => {
					if (err) throw err;
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

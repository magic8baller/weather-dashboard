require('dotenv/config')
const User = require('../resources/user/user.model.js')
const jwt = require('jsonwebtoken')

const newToken = user => {
	return jwt.sign({id: user.id}, process.env.JWT_SECRET, {
		expiresIn: '1d'
	})
}
exports.verifyToken = token => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, config.secrets.jwt, (err, payload) => {
			if (err) return reject(err)
			resolve(payload)
		})
	})
}

exports.register = async (req, res) => {
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
				id: user.id
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

exports.login = async (req, res) => {
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
				id: user.id
			}
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{expiresIn: '1d'},
			(err, token) => {
				if (err) throw err;
				res.json({token});
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
}


exports.protect = async (req, res, next) => {
	const bearer = req.headers.authorization

	if (!bearer || !bearer.startsWith('Bearer ')) {
		return res.status(401).end()
	}

	const token = bearer.split(' ')[1].trim()
	let payload
	try {
		payload = await verifyToken(token)
	} catch (e) {
		return res.status(401).end()
	}

	const user = await User.findById(payload.id)
		.select('-password')
		.lean()
		.exec()

	if (!user) {
		return res.status(401).end()
	}

	req.user = user
	next()
}
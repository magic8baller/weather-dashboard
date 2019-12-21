require('dotenv/config')
const User = require('./user.model.js')
const jwt =  require('jsonwebtoken')
exports.me = (req, res) => {
	res.status(200).json({data: req.user})
}

exports.updateMe = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.user._id, req.body, {
			new: true
		})
			.lean()
			.exec()

		res.status(200).json({data: user})
	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
}

// exports.getMeFromToken = async (req, res, next) => {
	// check header or url parameters or post parameters for token
// 	let token = req.body.token || req.query.token || req.headers['Authorization'];
// 	if (!token) {
// 		return res.status(401).json({message: 'Must pass token'});
// 	}
// 	// Check token that was passed by decoding token using secret
// 	jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
// 		if (err) throw err;
// 		//return user using the id from w/in JWTToken
// 		User.findById({
// 			id: user.id
// 		} function (err, user) {
// 			if (err) throw err;

// 			user = getCleanUser(user);
// 			//Note: you can renew token by creating new token(i.e.
// 			//refresh it)w/ new expiration time at this point, but I’m
// 			//passing the old token back.
// 			// var token = utils.generateToken(user);
// 			res.json({
// 				user: user,
// 			token: token
// 		});

// });
// }
// // exports.getCleanUser = (user) =>{
// 	if (!user) return {};

// 	var u = user.toJSON();
// 	return {
// 		id: u.id,
// 		name: u.name,

// 		email: u.email,

// 	}
// }
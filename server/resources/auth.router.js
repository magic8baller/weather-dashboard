const {Router} = require('express');
const router = Router()
const {check} = require('express-validator')
router.post('/', [

	check('email', 'Please include a valid email').isEmail(),
	check(
		'password',
		'Please enter a password with 6 or more characters'
	).isLength({min: 6})
])
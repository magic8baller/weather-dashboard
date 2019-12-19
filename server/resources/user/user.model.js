const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		}
	},
	{timestamp: true}
)

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next()
	}

	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) {
			return next(err)
		}

		this.password = hash
		next()
	})
})

// userSchema.methods.newAuthToken = async function () {
// 	const user = this
// 	const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP})
// 	await user.save()
// 	return token
// }
userSchema.methods.checkPassword = function (password) {
	const encryptedPassword = this.password
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, encryptedPassword, (err, verifiedPassword) => {
			if (err) {
				return reject(err)
			}

			resolve(verifiedPassword)
		})
	})
}

module.exports = User = mongoose.model('user', userSchema);

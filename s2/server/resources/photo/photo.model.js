const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
	url: String,
	fileName: String,
	favorite: Boolean,
	userPhoto: Boolean,
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user',
		required: true
	}
}, {
	timestamps: true
})

module.exports = Photo = mongoose.model('photo', photoSchema)
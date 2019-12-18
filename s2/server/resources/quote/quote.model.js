const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
	quote: String,
	author: String,
	favorite: Boolean,
	userQuote: Boolean,
	date: String,
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user',
		required: true
	}
}, {
	timestamps: true
})

module.exports = Quote = mongoose.model('quote', quoteSchema)
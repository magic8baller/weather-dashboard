const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 50
		},
		content: {
			type: String,
			required: true,
			maxlength: 300
		},
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user',
			required: true
		}
	},
	{timestamps: true}
)


module.exports = Note = mongoose.model('note', noteSchema);

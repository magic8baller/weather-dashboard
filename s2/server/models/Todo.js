const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			maxlength: 100
		},
		status: {
			type: String,
			required: true,
			enum: ['active', 'complete'],
			default: 'active'
		},
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user',
			required: true
		}
	},
	{timestamps: true}
)


module.exports = Todo = mongoose.model('todo', todoSchema);

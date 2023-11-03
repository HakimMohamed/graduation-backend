const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: Object,
			required: true,
			unique: true,
			first: {
				type: String,
				required: true,
			},
			last: {
				type: String,
				required: true,
			},
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'Users',
		timestamps: true,
	}
);

const CourseSchema = mongoose.model('User', userSchema);

module.exports = CourseSchema;

const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
	{
		courseCode: {
			type: String,
			required: true,
		},
		course_name: {
			type: String,
			required: true,
		},
		start_time: {
			type: String,
			required: true,
		},
		end_time: {
			type: String,
			required: true,
		},
		day_of_week: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const CourseSchema = mongoose.model('Course', courseSchema);

module.exports = CourseSchema;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = require('./Course');

const timeTableSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student', 
    },
    courses: [courseSchema],
    gpa: {
        type: Number,
        required: true
    },
}, {timestamps:true});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);

module.exports = TimeTable;

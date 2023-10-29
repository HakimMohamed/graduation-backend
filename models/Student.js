const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    first_name: String,
    last_name: String,
    date_of_birth: Date,
    email: String,
}, {timestamps:true});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

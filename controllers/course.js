const Course = require('../models/Course');

const course = {};
// get all Courses
course.getAllCourses = async (req, res) => {
	try {
		const course = await Course.find({});
		res.status(200).json(course);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

// get single course
course.getCourseById = async (req, res) => {
	const courseCode = req.params.id;
	// if course code is null return course code is null
	try {
		const course = await Course.findOne({ courseCode });
		res.status(200).json(course);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};
//create new course
course.createCourse = async (req, res) => {
	const { courseCode, course_name, start_time, end_time, day_of_week } = req.body;
	// if course is already created return course is already created
	try {
		const course = await Course.create({ courseCode, course_name, start_time, end_time, day_of_week });
		res.status(200).json(course);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};
//delete course
course.deleteCourse = async (req, res) => {
	const courseCode = req.params.id;
	// if course code is null return course code is null
	try {
		const course = await Course.deleteOne({ courseCode });

		res.status(200).json(`deleted course ${courseCode}`);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

//update a course

// still have a lot of changes
course.updateCourse = async (req, res) => {
	const courseId = req.params.id;
	const { courseCode, course_name, start_time, end_time, day_of_week } = req.body;

	// if course code is null return course code is null
	try {
		const course = await Course.updateOne(
			{ courseCode: courseId },
			{ courseCode, course_name, start_time, end_time, day_of_week }
		);
		res.status(200).json(`updated course ${courseId}`);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};
module.exports = course;

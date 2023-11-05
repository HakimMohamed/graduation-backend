const Course = require('../models/Course');

const course = {};
// get all Courses
// Handle exception where courses is equal to an empty array

course.getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find({});
		if (courses.length === 0) {
			return res.status(200).send('No courses found');
		}
		console.log(courses);
		res.status(200).json(courses);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

// get single course
course.getCourseById = async (req, res) => {
	const courseCode = req.params.id;
	if (!courseCode) {
		return res.status(400).send('No given id');
	}
	// if course code is null return course code is null
	try {
		const course = await Course.findOne({ courseCode });
		if (!course) {
			return res.status(200).send('No course found');
		}
		res.status(200).json(course);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};
//create new course
course.createCourse = async (req, res) => {
	const { courseCode, course_name, start_time, end_time, day_of_week } = req.body;
	// if course is already created return course is already created
	if (!courseCode || !course_name || !start_time || !end_time || !day_of_week) {
		return res.status(400).json({ err: 'courseCode ,courseName , startTime , endTime and dayOfWeek are required' });
	}
	try {
		const existingCourse = await Course.findOne({ courseCode });
		if (existingCourse) {
			return res.status(409).send('Course is already created');
		}
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
	if (!courseCode) {
		return res.status(404).send('No given id');
	}
	try {
		const course = await Course.deleteOne({ courseCode });
		if (!course) {
			return res.status(404).send('No course found to be deleted');
		}
		res.status(200).json(`deleted course ${courseCode}`);
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
};

//update a course

// still have a lot of changes
course.updateCourse = async (req, res) => {
	try {
		const courseCode = req.params.id;

		const { course_name, start_time, end_time, day_of_week } = req.body;

		const updates = { course_name, start_time, end_time, day_of_week };

		const dbCourse = await Course.findOneAndUpdate({ courseCode }, updates, {
			new: true,
			runValidators: true,
		});

		if (!courseCode) {
			return res.status(409).send('No given id');
		}
		if (!dbCourse) {
			return res.status(404).send('No Course found');
		}
		res.status(200).json({ dbCourse });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
	// if course code is null return course code is null
};
module.exports = course;

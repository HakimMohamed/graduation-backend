const express = require('express');
const courseController = require('../controllers/course');

const router = express.Router();

// GENERAL
router.get('/', courseController.getAllCourses);

//Pass an id parameter
router.get('/:id', courseController.getCourseById);

//General use of post is to create or post
router.post('/', courseController.createCourse);

//Delete specific thing
router.delete('/:id', courseController.deleteCourse);

//patch = update
router.patch('/:id', courseController.updateCourse);
module.exports = router;

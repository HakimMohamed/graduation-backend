const express = require('express');

const router = express.Router();

// GENERAL
router.get('/', (req, res) => {
  res.json({ msg: 'test route get' });
});

//Pass an id parameter
router.get('/:id', (req, res) => {
  res.json({ msg: 'test route get with id passed as param' });
});

//General use of post is to create or post
router.post('/:id', (req, res) => {
  res.json({ msg: 'test route post to create' });
});

//Delete specific thing
router.delete('/:id', (req, res) => {
  res.json({ msg: 'test route delete to delete with param' });
});

//patch = update
router.patch('/:id', (req, res) => {
  res.json({ msg: 'test route patch to update ' });
});
module.exports = router;

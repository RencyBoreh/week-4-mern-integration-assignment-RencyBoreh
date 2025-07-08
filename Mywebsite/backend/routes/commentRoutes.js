const express = require('express');
const router = express.Router();
const {
  addComment,
  getComments
} = require('../controllers/commentController');
const auth = require('../middleware/authMiddleware');

router.post('/:skillId', auth, addComment);
router.get('/:skillId', getComments);

module.exports = router;

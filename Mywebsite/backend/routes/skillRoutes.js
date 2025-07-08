const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  addSkill,
  deleteSkill,
  rateSkill
} = require('../controllers/skillController');
const auth = require('../middleware/authMiddleware');

router.get('/', getAllSkills);
router.post('/', auth, addSkill);
router.delete('/:id', auth, deleteSkill);
router.post('/:id/rate', auth, rateSkill);

module.exports = router;

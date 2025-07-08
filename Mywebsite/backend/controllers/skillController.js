const Skill = require('../models/Skill');
const User = require('../models/User');

const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate('user', 'name email').populate('comments');
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addSkill = async (req, res) => {
  try {
    const { name, type } = req.body;
    const userId = req.user.id;

    const newSkill = await Skill.create({ user: userId, name, type });

    await User.findByIdAndUpdate(userId, { $push: { skills: newSkill._id } });

    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    await User.findByIdAndUpdate(skill.user, { $pull: { skills: skill._id } });

    res.status(200).json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const rateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const skill = await Skill.findById(id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    skill.ratings.push(rating);
    await skill.save();

    res.status(200).json({ message: 'Rating added', average: (skill.ratings.reduce((a, b) => a + b) / skill.ratings.length).toFixed(1) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllSkills, addSkill, deleteSkill, rateSkill };

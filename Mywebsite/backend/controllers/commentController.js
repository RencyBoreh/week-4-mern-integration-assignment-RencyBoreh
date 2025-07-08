const Comment = require('../models/Comment');
const Skill = require('../models/Skill');

const addComment = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const newComment = await Comment.create({ text, skill: skillId, user: userId });

    await Skill.findByIdAndUpdate(skillId, { $push: { comments: newComment._id } });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { skillId } = req.params;

    const comments = await Comment.find({ skill: skillId }).populate('user', 'name email');

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addComment, getComments };

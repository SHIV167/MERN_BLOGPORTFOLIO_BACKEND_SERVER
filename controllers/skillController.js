const asyncHandler = require("express-async-handler");
const Skill = require("../models/skillModel");

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({}).sort({ category: 1, name: 1 });
  res.status(200).json(skills);
});

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private/Admin
const createSkill = asyncHandler(async (req, res) => {
  try {
    const { name, category, proficiency, icon, description } = req.body;
    if (!name || !category) {
      return res.status(400).json({ message: "Name and category are required." });
    }
    const skillExists = await Skill.findOne({ name });
    if (skillExists) {
      return res.status(400).json({ message: "Skill already exists" });
    }
    const skill = await Skill.create({
      name,
      category,
      proficiency,
      icon,
      description,
    });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    res.status(404);
    throw new Error("Skill not found");
  }

  const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedSkill);
});

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    res.status(404);
    throw new Error("Skill not found");
  }

  await skill.deleteOne();
  res.status(200).json({ message: "Skill removed" });
});

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};

const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.status(200).json(projects);
});

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ featured: true }).sort({
    createdAt: -1,
  });
  res.status(200).json(projects);
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  const { title, description, image, tags, demoLink, githubLink, featured } =
    req.body;

  const projectExists = await Project.findOne({ title });
  if (projectExists) {
    res.status(400);
    throw new Error("Project with this title already exists");
  }

  const project = await Project.create({
    title,
    description,
    image,
    tags,
    demoLink,
    githubLink,
    featured,
  });

  if (project) {
    res.status(201).json(project);
  } else {
    res.status(400);
    throw new Error("Invalid project data");
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProject);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  await project.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProjects,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
};

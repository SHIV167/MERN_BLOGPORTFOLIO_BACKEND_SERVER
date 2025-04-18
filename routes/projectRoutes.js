const express = require("express");
const router = express.Router();
const {
  getProjects,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProjects).post(protect, admin, createProject);
router.get("/featured", getFeaturedProjects);
router
  .route("/:id")
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

module.exports = router;

const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getPosts, createPost, updatePost, deletePost,
  getSkills, createSkill, updateSkill, deleteSkill,
  getVideos, createVideo, updateVideo, deleteVideo
} = require('../controllers/dashboardController');

// Post routes
router.route('/posts')
  .get(getPosts)
  .post(protect, admin, createPost);

router.route('/posts/:id')
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost);

// Skill routes
router.route('/skills')
  .get(getSkills)
  .post(protect, admin, createSkill);

router.route('/skills/:id')
  .put(protect, admin, updateSkill)
  .delete(protect, admin, deleteSkill);

// Video routes
router.route('/videos')
  .get(getVideos)
  .post(protect, admin, createVideo);

router.route('/videos/:id')
  .put(protect, admin, updateVideo)
  .delete(protect, admin, deleteVideo);

module.exports = router;
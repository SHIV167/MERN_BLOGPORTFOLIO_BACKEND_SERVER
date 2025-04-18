const express = require("express");
const router = express.Router();
const {
  getVideos,
  getFeaturedVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/youtubeController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getVideos).post(protect, admin, createVideo);
router.get("/featured", getFeaturedVideos);
router
  .route("/:id")
  .put(protect, admin, updateVideo)
  .delete(protect, admin, deleteVideo);

module.exports = router;

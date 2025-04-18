const asyncHandler = require("express-async-handler");
const Youtube = require("../models/youtubeModel");

// @desc    Get all videos
// @route   GET /api/youtube
// @access  Public
const getVideos = asyncHandler(async (req, res) => {
  const videos = await Youtube.find({}).sort({ createdAt: -1 });
  res.status(200).json(videos);
});

// @desc    Get featured videos
// @route   GET /api/youtube/featured
// @access  Public
const getFeaturedVideos = asyncHandler(async (req, res) => {
  const videos = await Youtube.find({ featured: true }).sort({
    createdAt: -1,
  });
  res.status(200).json(videos);
});

// @desc    Create new video
// @route   POST /api/youtube
// @access  Private/Admin
const createVideo = asyncHandler(async (req, res) => {
  try {
    const { title, description, videoId, category, featured } = req.body;
    if (!title || !videoId) {
      return res.status(400).json({ message: "Title and YouTube Video ID are required." });
    }
    const video = await Youtube.create({
      title,
      description,
      videoId,
      category,
      featured,
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update video
// @route   PUT /api/youtube/:id
// @access  Private/Admin
const updateVideo = asyncHandler(async (req, res) => {
  const video = await Youtube.findById(req.params.id);

  if (!video) {
    res.status(404);
    throw new Error("Video not found");
  }

  const updatedVideo = await Youtube.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedVideo);
});

// @desc    Delete video
// @route   DELETE /api/youtube/:id
// @access  Private/Admin
const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Youtube.findById(req.params.id);

  if (!video) {
    res.status(404);
    throw new Error("Video not found");
  }

  await video.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getVideos,
  getFeaturedVideos,
  createVideo,
  updateVideo,
  deleteVideo,
};

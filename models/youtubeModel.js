const mongoose = require("mongoose");

const youtubeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a video title"],
    },
    description: {
      type: String,
      required: false,
      default: ""
    },
    videoId: {
      type: String,
      required: [true, "Please add a YouTube video ID"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: false,
      default: "Other"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Youtube", youtubeSchema);

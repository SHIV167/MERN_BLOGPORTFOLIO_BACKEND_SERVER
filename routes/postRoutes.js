const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");
const { protect, admin } = require("../middleware/authMiddleware");
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mern_blog_uploads', // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
});

const upload = multer({ storage });

// Error handling middleware for multer
const uploadMiddleware = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File size too large. Maximum size is 5MB." });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single post
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "author",
      "name"
    );
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create post (Admin only)
router.post("/", protect, admin, uploadMiddleware, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Please provide title, content, and category" });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen

    const post = await Post.create({
      title,
      content,
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      slug,
      author: req.user._id,
      image: req.file ? req.file.path : null,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name"
    );
    res.status(201).json(populatedPost);
  } catch (error) {
    // Check for duplicate slug error
    if (error.code === 11000 && error.keyPattern?.slug) {
      return res
        .status(400)
        .json({ message: "A post with this title already exists" });
    }
    res.status(400).json({ message: error.message });
  }
});

// Update post (Admin only)
router.put("/:id", protect, admin, uploadMiddleware, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const post = await Post.findById(req.params.id);

    if (post) {
      post.title = title || post.title;
      post.content = content || post.content;
      post.category = category || post.category;
      post.tags = tags ? tags.split(",").map((tag) => tag.trim()) : post.tags;
      if (req.file) {
        // Delete old image if it exists
        if (post.image) {
          const oldImagePath = path.join(__dirname, "..", post.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        post.image = req.file.path;
      }
      if (title && title !== post.title) {
        post.slug = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      }

      const updatedPost = await post.save();
      const populatedPost = await Post.findById(updatedPost._id).populate(
        "author",
        "name"
      );
      res.json(populatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.slug) {
      return res
        .status(400)
        .json({ message: "A post with this title already exists" });
    }
    res.status(400).json({ message: error.message });
  }
});

// Delete post (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      // Delete image file if it exists
      if (post.image) {
        const imagePath = path.join(__dirname, "..", post.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await post.deleteOne();
      res.json({ message: "Post removed" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

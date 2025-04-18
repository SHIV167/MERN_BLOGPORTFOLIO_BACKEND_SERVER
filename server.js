const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/videos", require("./routes/youtubeRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/header-menu", require("./routes/headerMenu"));
app.use("/api/footer", require("./routes/footerContent"));
app.use('/api/feedback', require('./routes/postFeedback'));
app.use('/api/popup', require('./routes/popup'));
app.use('/api/upload', require('./routes/upload'));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

//home
app.get("/",(req, res)=>{res.status(200).send({"success": true, "msg": "Node Server Started Successfully"
})
                       
})

//listen
app.listen(PORT, () => {
  console.log(`Server Runnning ${PORT}`.bgGreen.white);
});

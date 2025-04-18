const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a skill name"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: ["Frontend", "frontend", "Backend", "backend", "Database", "database", "DevOps", "devops", "Other", "other"],
    },
    proficiency: {
      type: Number,
      required: [true, "Please add a proficiency level (1-100)"],
      min: 1,
      max: 100,
    },
    icon: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);

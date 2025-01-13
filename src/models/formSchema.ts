import mongoose from "mongoose";

// Define the syllabus subdocument schema
const syllabusItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  topic: {
    type: String,
    required: [true, "Topic is required"],
  },
  date: {
    type: String,
    default: null, // Allow nullable date
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Define the main PostForm schema
const postFormSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "users",
      required: [true, "UserId is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title must be at least 2 characters."],
    },
    userLevel: {
      type: String,
      enum: [
        "Absolute Beginner",
        "Beginner",
        "Normal Intermediate",
        "Intermediate",
        "Advanced",
      ],
      required: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters."],
    },
    startDate: {
      type: String,
      default: null, // Allow nullable date
    },
    endDate: {
      type: String,
      default: null, // Allow nullable date
    },
    syllabus: {
      type: [syllabusItemSchema],
      validate: {
        validator: function (v: any) {
          return v && v.length > 0;
        },
        message: "At least one syllabus item is required",
      },
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the model
const PostFormModel =
  mongoose.models.PostForm || mongoose.model("PostForm", postFormSchema);

export default PostFormModel;

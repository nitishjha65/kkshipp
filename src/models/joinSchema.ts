import mongoose from "mongoose";

const joinSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "users",
      required: [true, "Please provide a joiner user Id"],
    },
    joinedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "PostForm" }],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

//nextjs connect to db for every api call
const JoinModel =
  mongoose.models.joiners || mongoose.model("joiners", joinSchema);

export default JoinModel;

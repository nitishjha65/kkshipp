import mongoose from "mongoose";

const joinSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: [true, "Please provide postId "],
  },
  userId: {
    type: String,
    ref: "users",
    required: [true, "Please provide a joiner user Id"],
  },
  isJoined: {
    type: Boolean,
    default: true,
  },
});

//nextjs connect to db for every api call
const JoinModel =
  mongoose.models.joiners || mongoose.model("joiners", joinSchema);

export default JoinModel;

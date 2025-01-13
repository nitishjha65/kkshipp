import { model, models } from "mongoose";

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true },
    feedback: { type: String, required: true },
    topic: { type: String, required: true },
    postId: { type: String, required: true },
    isUserIdCreator: { type: Boolean, required: true, default: false },
    feedbackProviderId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

//commitment heatmap
//for creators, no of topics which have atleast one feedback is the commitment count
//for others who are not creators, no of feedbacks are the commitments, bcz only one feedback per topic
//all commitmnents are equal whether of creator or joiner

const FeedbackModel = models.feedback || model("feedback", feedbackSchema);

export default FeedbackModel;

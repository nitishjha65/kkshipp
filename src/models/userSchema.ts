import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, "Please provide unique username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

//nextjs connect to db for every api call
const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;

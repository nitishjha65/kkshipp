import mongoose from "mongoose";

let isConnected = false;
let connectionCount = 0; // Track the number of new connections

export async function connect() {
  // If already connected, skip the connection process
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    // Establish the connection to MongoDB
    await mongoose.connect(process.env.MONGO_URI!);

    // Monitor connection events
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
      isConnected = true;
      connectionCount += 1; // Increment the connection count
      console.log(`Total connections made: ${connectionCount}`);
    });

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1); // Exit process in case of an error
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      isConnected = false;
    });
  } catch (error) {
    console.error("Mongoose connection error:", error);
    process.exit(1); // Exit process in case of failure
  }
}

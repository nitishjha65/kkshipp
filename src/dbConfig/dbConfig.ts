import mongoose from "mongoose";

export async function connect() {
  mongoose.connect(process.env.MONGO_URI!);

  mongoose.connection.on("connected", () => {
    console.log("MongoDb connected succesfully");
  });

  mongoose.connection.on("error", (error) => {
    console.log("MongoDb connection event failed", error);
    process.exit();
  });

  try {
  } catch (error) {
    console.log("Mongoose connection error");
    console.log(error);
  }
}

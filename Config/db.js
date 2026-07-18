import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Error:", err.message);
  }
};

export default connectDB;

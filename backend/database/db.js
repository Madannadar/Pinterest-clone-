import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "pinterest", // Specify the database name
      serverSelectionTimeoutMS: 100000, // Timeout for server selection
      connectTimeoutMS: 300000, // Timeout for connection establishment
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message || error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDb;


import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "pinterest", // Specify the database name
      useNewUrlParser: true, // Ensures support for new MongoDB connection strings
      useUnifiedTopology: true, // Enables the new connection management engine
      serverSelectionTimeoutMS: 100000, // Timeout for initial connection
      connectTimeoutMS: 300000, // Timeout for overall connection establishment
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message || error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDb;

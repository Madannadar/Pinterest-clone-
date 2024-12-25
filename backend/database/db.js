import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.set("bufferCommands", false); // Set bufferCommands before connection
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "pinterest",
      useNewUrlParser: true, // Recommended options
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDb;

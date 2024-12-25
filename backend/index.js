import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";

// Load environment variables
dotenv.config();

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET, // Correct key names
});

const app = express();
const port = process.env.PORT || 3000;

// Using middlewares
app.use(express.json());
app.use(cookieParser());

// Importing routes
import userRoutes from "./routes/userRoutes.js";
import pinRoutes from "./routes/pinRoutes.js";

// Using routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

// Serving static files for frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Connect to the database and start the server
(async () => {
  try {
    await connectDb(); // Ensure DB connection before starting the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit process on failure
  }
})();

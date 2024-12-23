import express from 'express';
// this is a es6 feature that is done by type
import dotenv from 'dotenv';
import connectDb from './database/db.js'; // need to write .js because of "type": "module", in package.json
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

dotenv.config(); // load environment variables
 
cloudinary.v2.config({
    Cloud_Name: process.env.CLOUD_NAME,
    CLoud_Api_Key: process.env.CLOUD_API_KEY,
    Cloud_Secrete: process.env.CLOUD_SECRETE,  // this is not a typo, it's the secret key
 
}); // load environment variables

const app = express();

const port = process.env.PORT;

// using middleware
app.use(express.json());
app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// importing routes
import userRoutes from './routes/userRoutes.js';

// using routes
app.use("/api/user",userRoutes);
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
    connectDb();
});
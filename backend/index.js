import express from 'express';
// this is a es6 feature that is done by type
import dotenv from 'dotenv';
import connectDb from './database/db.js'; // need to write .js because of "type": "module", in package.json
import cookieParser from 'cookie-parser';

dotenv.config(); // load environment variables
 

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
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,{
      dbName: 'pinterest',
    });

    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
mongoose.set('bufferCommands', false);

export default connectDb;

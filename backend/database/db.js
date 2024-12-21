import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName: 'pinterest',
        })
        console.log("MongoDb connection established");
        
    }catch (error){
        console.log(error);
    }
};

export default connectDb;
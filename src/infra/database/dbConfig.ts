import mongoose, { connection } from "mongoose";
const connectDB = async (connectionUrl:string):Promise<void> =>{
    try{
        await mongoose.connect(connectionUrl);
        console.log("MongoDB connected !");
    }catch(err){
        throw new Error("Failed to connect to MongoDB")
    }
};
export default connectDB
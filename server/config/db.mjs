import mongoose from "mongoose";
import {MONGO_URI} from "./environment.mjs";


const connectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected from config/db.mjs");
    } catch (error) {
        console.error("Error connecting to MongoDB from config/db.mjs:", error);
     }
}

export default connectDB;
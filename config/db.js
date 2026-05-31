import mongoose from "mongoose";

const connectDB = async ()=>{

    try{
        const cennectdb = await mongoose.connect(process.env.MONGO_URI);

        console.log(process.env.MONGO_URI);
        console.log("connect DB");
    }catch(error){
        console.log(error);
    }

}

export default connectDB;
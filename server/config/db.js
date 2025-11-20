import mongoose from "mongoose"
export const ConnectDB=async(mongoUri)=>{
try{
    const conn=await mongoose.connect(mongoUri)
    console.log(`MongoDb connected :${conn.connection.host}`);
}
catch(err){
    console.log(`Mongodb connection error:${err.message}`)
    process.exit(1);
}
}
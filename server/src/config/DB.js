import mongoose from "mongoose"
import config from "./config"
const connectToDb = async()=>{
    try {

        await mongoose.connect(config.MONGO_URI)
        console.log("db is connected successfully")
    } catch (error) {
        console.log("something is wrong with db")
    }
}


export default connectToDb
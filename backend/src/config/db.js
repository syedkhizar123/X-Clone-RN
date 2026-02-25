import mongoose from "mongoose"
import { ENV } from "./env.js"
export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI)
        console.log("DB Connected")
    } catch (error) {
        console.log("Error Connecting DB" , error)
        process.exit(1)
    }
}
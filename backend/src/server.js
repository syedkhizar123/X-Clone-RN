import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

const app = express()
app.use(express.json())


const PORT = 5000

app.get("/", (req, res) => {
    res.send("Hello World")
})


const startServer = async () => {
    try {
        await connectDB()
        app.listen(ENV.PORT, () => {
            console.log(`Server is running on port ${ENV.PORT}`)
        })
    } catch (error) {
        console.log("Error Starting Server", error)
        process.exit(1)
    }
}

startServer()


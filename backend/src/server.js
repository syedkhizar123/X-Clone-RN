import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.routes.js"
import commentRoutes from "./routes/comment.route.js"
import notificationRoutes from "./routes/notification.route.js"
import { arjectMiddleware } from './middleware/arcjet.middleware.js';

const app = express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(arjectMiddleware)


app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/notifications", notificationRoutes)

// error handling middleware
app.use((err, req, res) => {
    console.error("Unhandled error:", err)
    res.status(500).json({ error: err.message || "Internal Server Error" })
})


const PORT = 5000

app.get("/", (req, res) => {
    res.send("Hello World")
})


const startServer = async () => {
    try {
        await connectDB()
        if (ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => {
                console.log(`Server is running on port ${ENV.PORT}`)
            })
        }

    } catch (error) {
        console.log("Error Starting Server", error)
        process.exit(1)
    }
}

startServer()

export default app

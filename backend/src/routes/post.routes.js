import express from "express"
import { createPost, deletePost, getPost, getPosts, getUserPosts, likePost } from "../controllers/post.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import upload from "../middleware/upload.middleware.js"

const router = express.Router()

// PUBLIC ROUTES
router.get("/" , getPosts)
router.get("/:PostId" , getPost)
router.get("/user/:username" , getUserPosts)

// PROTECTED ROUTES
router.post("/create" , protectRoute , upload.single("image") , createPost)
router.post("/:postId/like" , protectRoute , likePost)
router.delete("/delete/:postId" , protectRoute , deletePost)

export default router
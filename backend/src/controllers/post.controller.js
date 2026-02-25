import asyncHandler from "express-async-handler"
import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import { getAuth } from "@clerk/express"
import cloudinary from "../config/cloudinary.js"
import Notification from "../models/notification.model.js"
import Comment from "../models/comment.model.js"


export const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture")
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username firstName lastName profilePicture"
            }
        })

    res.status(200).json({ message: "Posts fetched successfully", posts })
})

export const getPost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const post = await Post.findById(postId)
        .populate("user", "username firstName lastName profilePicture")
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username firstName lastName profilePicture"
            }
        })

    if (!post) return res.status(404).json({ message: "Post not found" })

    res.status(200).json({ message: "Post fetched successfully", post })
})

export const getUserPosts = asyncHandler(async (req, res) => {

    const { username } = req.params

    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ message: "User not found" })

    const userPosts = await Post.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture")
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username firstName lastName profilePicture"
            }
        })

    return res.status(200).json({ message: "User's posts fetched successfully", userPosts: userPosts ? userPosts : "This user has no Posts" })
})

export const createPost = asyncHandler(async (req, res) => {

    const { userId } = getAuth(req)
    const { content } = req.body
    const { image } = req.file

    if (!content && !image) {
        return res.status(400).json({ message: "Post must contain either Image or Text" })
    }

    const user = User.findOne({ clerkId: userId })
    if (!user) return res.status(404).json({ message: "User not Found" })

    let imageURL = ""

    if (image) {
        try {

            const base64Image = `data:${image.mimetype};base64,${image.buffer.toString(
                "base64"
            )}`

            const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                folder: "social_media_posts",
                resource_type: "image",
                transformation: [
                    { width: 800, height: 600, crop: "limit" },
                    { quality: "auto" },
                    { format: "auto" },
                ],
            })

            imageURL = uploadResponse.secure_url
        } catch (error) {
            return res.status(400).json({ message: "Error uploading image", error })
        }
    }

    const post = await Post.create({
        user: user._id,
        content: content || "",
        image: imageURL
    })

    return res.status(201).json({ message: "Post created successfully", post: post })
})

export const likePost = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const { postId } = req.params

    const user = await User.findOne({ clerkId: userId })
    const post = await Post.findById(postId)

    if (!user || !post) {
        return res.status(404).json({ message: "User or Post not found" })
    }

    const isLiked = post.likes.includes(user._id)
    if (isLiked) {
        await Post.findByIdAndUpdate(postId, {
            $pull: { likes: user._id }
        })
    } else {
        if (post.user.toString() === user._id.toString()) {
            return res.status(400).json({ message: "Can't like own post " })
        } else {
            await Post.findByIdAndUpdate(postId, {
                $push: { likes: user._id }
            })
        }
    }
    await Notification.create({
        from: user._id,
        to: post.user,
        type: "like",
        post: postId
    })

    return res.status(200).json({ message: isLiked ? "Post Unliked Successfully" : "Post Liked Successfully" })

})

export const deletePost = asyncHandler ( async (req , res) => {
    const { userId } = getAuth(req)
    const { postId } = req.params

    const user = await User.findOne({ clerkId : userId})
    const post = await Post.findById(postId)

    if( !user || !post ){
        return res.status(404).json({ message: "User or post not found"})
    }

    if(post.user.toString() !== user._id.toString()){
        return res.status(401).json({ message: "Unauthorized. You can only delete your posts."})
    }

    // Delete comments of the post first
    await Comment.deleteMany({ post: postId})

    // Delete post 
    await Post.findByIdAndDelete(postId)

    res.status(200).json({ message: "Post deleted successfully"})

})
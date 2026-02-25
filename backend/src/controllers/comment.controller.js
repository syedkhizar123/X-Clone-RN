import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ message: "Post Not Found" })

    const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture")

    return res.status(200).json({ message: "comments fetches duccessfully", comments })
})

export const createComment = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const { postId } = req.params
    const { content } = req.body

    if (!content || content.trim() === "") return res.status(400).json({ message: "Comment can not be empty" })

    const user = await User.findOne({ clerkId: userId })
    const post = await Post.findById(postId)

    if (!user || !post) return res.status(404).json({ message: "User or Post not found" })

    const comment = await Comment.create({
        post: postId,
        user: user._id,
        content
    })

    await Post.findByIdAndUpdate(postId, {
        $push: { comments: comment._id }
    })

    if (user._id.toString() !== post.user) {
        await Notification.create({
            from: user._id,
            to: post.user,
            type: "comment",
            comment: comment._id,
            post: postId
        })
    }
    return res.status(201).json({ message: "comment added successfully", comment })

})

export const deleteComment = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const { commentId } = req.params

    const user = await User.findOne({ clerkId: userId})
    const comment = await Comment.findById(commentId)
    
    if(!user || !comment) return res.status(404).json({ message: "User or comment not found"})

    if(comment.user.toString() !== user._id.toString()){
        return res.status(401).json({ message: "You can only delete your own comments "})
    } else {
        await Post.findByIdAndUpdate( comment.post , {
            $pull : { comments: commentId} 
        })

        await Comment.findByIdAndDelete(commentId)

        return res.status(200).json({ message: "comment deleted successfully"})
    }
})
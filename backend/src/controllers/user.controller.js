import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";
import { clerkClient } from "@clerk/express";


export const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params
    const user = await User.find({ username });
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }

    return res.status(200).json({ user })
})

export const updateProfile = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)

    const user = await User.findByIdAndUpdate({ clerkId: userId }, req.body, { new: true })

    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }

    return res.status(200).json({ message: "Updated", user })
})

export const syncUser = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)

    const existingUser = await User.findOne({ clerkId: userId })
    if (existingUser) {
        return res.status(200).json({ message: "User already exists" })
    }

    const clerkUser = await clerkClient.users.getUser(userId)
    const userData = {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
        profilePicture: clerkUser.imageUrl || ""
    }

    const newUser = User.create(userData)
    res.status(201).json({ message: "User created successfully", newUser })
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }

    return res.status(200).json({ user })
})

export const followUser = asyncHandler(async (req, res) => {

    const { userId } = getAuth(req)
    const { targetUserId } = req.params

    if (userId === targetUserId) {
        return res.status(400).json({ message: "You can not follow yourself" })
    }

    const currentUser = User.findOne({ clerId: userId })
    const targetUser = User.findOne({ clerkId: targetUserId })

    if (!currentUser || !targetUser) {
        return res.status(404).json({ message: "User not found" })
    }

    const isFollowing = currentUser.following.includes(targetUserId)

    if (isFollowing) {
        // Unfollow
        await User.findByIdAndUpdate(currentUser._id, {
            $pull: { following: targetUserId }
        })
        await User.findByIdAndUpdate(targetUserId, {
            $pull: { followers: currentUser._id }
        })
    } else {
        // Follow
        await User.findByIdAndUpdate(currentUser._id, {
            $push: { following: targetUserId }
        })
        await User.findByIdAndUpdate(targetUserId, {
            $push: { followers: currentUser._id }
        })

        await Notification.create({
            from: currentUser._id,
            to: targetUserId,
            type: "Follow"
        })
    }

    res.status(200).json({ message: isFollowing ? "User Unfollowed successfully" : "User followed successfully"})

})
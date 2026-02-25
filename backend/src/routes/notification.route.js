import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getNotifications , deleteNotifications } from "../controllers/notification.controller.js"

const router = express.Router()

// PRIVATE
router.get("/" , protectRoute , getNotifications)
router.delete("/:notificationId" , protectRoute , deleteNotifications)

export default router
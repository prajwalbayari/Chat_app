import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getMessages, getUserForSideBar } from "../controllers/message.controller.js";

const router=new express.Router()

router.get("/users",protectRoute,getUserForSideBar)
router.get("/:id",protectRoute,getMessages)
router.post("/users/:id",protectRoute,sendMessages)

export default router;
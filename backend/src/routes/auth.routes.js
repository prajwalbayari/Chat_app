import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

//Use post method for signup login and logout because we will be sending data to it

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;

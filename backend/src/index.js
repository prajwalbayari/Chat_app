import express from "express"
import appRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";

dotenv.config()
const PORT=process.env.PORT;

const app=express()

app.use("/api/auth",appRoutes)

app.listen(PORT,()=>{
    console.log("Server is running on port :"+PORT);
    connectDB();
})
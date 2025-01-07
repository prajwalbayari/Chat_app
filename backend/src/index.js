import express from "express"
import appRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.routes.js";

dotenv.config()
const PORT=process.env.PORT;

const app=express()

app.use(express.json()) //Helps to extract data from request body
app.use(cookieParser()) //Verify cookies

app.use("/api/auth",appRoutes)
app.use("/api/message",messageRoutes)

app.listen(PORT,()=>{
    console.log("Server is running on port :"+PORT);
    connectDB();
})
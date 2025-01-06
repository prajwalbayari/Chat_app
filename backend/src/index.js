import express from "express"
import appRoutes from "./routes/auth.routes.js"

const app=express()

app.use("/api/auth",appRoutes)

app.listen(5001,()=>{
    console.log("Server is running on port 5001")
})
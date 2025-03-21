const express = require("express");
const dotenv = require("dotenv").config();
const PostG = require("../src/config/db.js");
const authRoutes = require("../src/routes/authRoutes.js")
const userRoutes = require("../src/routes/userRoutes.js")
const departmentRoutes = require("../src/routes/departmentRoutes.js")


const app = express();

//Middleware

app.use(express.json());

//Routes

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/department", departmentRoutes);

// Start the Server

const PORT = process.env.PORT || 4500;

app.listen(PORT,()=>{
    console.log("Server is runnig at PORT" , PORT)
})
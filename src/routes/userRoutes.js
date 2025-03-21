const express = require ("express");

const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware.js")

const authorizeRoles = require("../middlewares/roleMiddleware.js")

// Only admin can access this router

router.get("/admin",verifyToken,authorizeRoles("admin"), (req,res)=>{
    res.json({message:"Welcome Admin"})
})

// Both admin and manager can access this 

router.get("/manager",verifyToken,authorizeRoles("admin", "manager"),(req,res)=>{
    res.send({message:"Welcome Manager"})
})

// All can acccess this router

router.get("/user",verifyToken,authorizeRoles("admin", "manager", "user"),(req,res)=>{
    res.json({message:"Welcome User"})
})

module.exports = router;
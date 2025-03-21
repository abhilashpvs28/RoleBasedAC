const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/roleMiddleware.js");
const {
    createDepartment, getDepartments, updateDepartments, deleteDepartment
} = require("../controllers/departmentController.js");



// Admin can create
router.post("/departmentpost", verifyToken, authorizeRoles("admin"), createDepartment);

// All can view
router.get("/departmentlist", verifyToken, authorizeRoles("admin", "manager", "user"), getDepartments);

// Admin & Manager can update
router.put("/:id", verifyToken, authorizeRoles("admin", "manager"), updateDepartments);

// Admin can delete
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteDepartment);

module.exports = router;

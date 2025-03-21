const db = require("../config/db.js");

// Create Department Entry (Admin Only)
const createDepartment = async (req, res) => {
    const { name, department, role, salary, doj, contact_number, email_id, gender } = req.body;

    try {
        const query = await db.query(
            `INSERT INTO departments
            (name, department, role, salary, doj, contact_number, email_id, gender)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, department, role, salary, doj, contact_number, email_id, gender]
        );
        res.status(201).json(query.rows[0]);
    } catch (err) {
        console.error("Error creating department entry:", err);
        res.status(500).json({ message: "Error creating department entry", error: err });
    }
};

// Get All Department Entries (All Roles)
const getDepartments = async (req, res) => {
    try {
        const department = await db.query("SELECT * FROM departments");
        res.status(200).json(department.rows);
    } catch (error) {
        console.error("Error fetching department entries:", error);
        res.status(500).json({ message: "Error fetching department entries", error });
    }
};

// Update Department Entry (Admin, Manager)
const updateDepartments = async (req, res) => {
    const { id } = req.params;
    const { name, department, role, salary, doj, contact_number, email_id, gender } = req.body;

    try {
        const updatedDept = await db.query(
            `UPDATE departments 
            SET name=$1, department=$2, role=$3, salary=$4, doj=$5, contact_number=$6, email_id=$7, gender=$8
            WHERE id=$9 RETURNING *`,
            [name, department, role, salary, doj, contact_number, email_id, gender, id]
        );

        if (updatedDept.rows.length === 0) {
            return res.status(404).json({ message: "Department entry not found" });
        }

        res.status(200).json(updatedDept.rows[0]);
    } catch (error) {
        console.error("Error updating department entry:", error);
        res.status(500).json({ message: "Error updating department entry", error });
    }
};

// Delete Department Entry (Admin Only)
const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDept = await db.query(
            "DELETE FROM departments WHERE id=$1 RETURNING *",
            [id]
        );

        if (deletedDept.rows.length === 0) {
            return res.status(404).json({ message: "Department entry not found" });
        }

        res.status(200).json({ message: "Department entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting department entry:", error);
        res.status(500).json({ message: "Error deleting department entry", error });
    }
};

// Export Controllers
module.exports = {
    createDepartment,
    getDepartments,
    updateDepartments,
    deleteDepartment
};

const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

function getAllDepartments() {
    router.get('/api/department', (req, res) => {
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
    });
};

module.exports = router;
exports.getAllDepartments = getAllDepartments();
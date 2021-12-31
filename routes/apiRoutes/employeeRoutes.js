const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

function getAllEmployees() {
    router.get('/api/employee', (req, res) => {
        const sql = `SELECT * FROM employee`;
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
        console.table(data)
    });
};

module.exports = router;
exports.getAllEmployees = getAllEmployees();
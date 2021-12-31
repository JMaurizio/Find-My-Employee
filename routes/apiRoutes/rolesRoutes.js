const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

function getAllRoles() {
    router.get('/api/roles', (req, res) => {
        const sql = `SELECT * FROM roles`;
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
exports.getAllRoles = getAllRoles();
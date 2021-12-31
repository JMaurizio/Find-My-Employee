const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

function getAllDepartments() {
    router.get('/api/department', (req, res) => {
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, rows) => {
            if(err) {
                res.status(500).json({error: err.message});
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
        console.table(data);
    });
};

function addDepartment() {
    router.post('/department', ({ body }, res) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [body.name];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: body,
                changes: result.affectedRows
            });
        });
    });
};

module.exports = router;
exports.getAllDepartments = getAllDepartments();
exports.addDepartment = addDepartment();
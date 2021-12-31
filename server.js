const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const departments = require('./routes/apiRoutes/departmentRoutes');
const roles = require('./routes/apiRoutes/rolesRoutes');
const employees = require('./routes/apiRoutes/employeeRoutes');


const PORT = process.env.PORT || 4002;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', apiRoutes);

const start = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Updated Employee Role']
        }
    ])
    .then(answer => {
        if (answer == 'View all Departments') {
            departments.getAllDepartments
        }
        if (answer == 'View all Roles') {
            roles.getAllRoles
        }
        if (answer == 'View all Employees') {
            employees.getAllEmployees
        }
        if (answer == 'Add Department') {
            departments.addDepartment
        }
    })
}

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

start()
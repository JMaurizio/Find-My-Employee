const inquirer = require('inquirer');
const cTable = require('console.table');
const choiceHandler = require('./db/db');
const mysql = require('mysql2/promise');
const dbConfig = require('./db/dbConfig');

async function start() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database
        });

        const handler = new choiceHandler(connection)
        let exit = false

        while (exit !== true) {
            const startPrompt = await inquirer.prompt({
                type: 'list',
                name: 'start',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add Department',
                    'Add Role',
                    'Add Employee',
                    'Update Employee Role',
                    'Quit']
            })
            
            switch(startPrompt.start) {
                case 'View All Departments':
                    console.table(await handler.allDepartments())
                    break;
                case 'View All Roles':
                    console.table(await handler.allRoles())
                    break;
                case 'View All Employees':
                    console.table(await handler.allEmployees())
                    break;
                case 'Add Department':
                      const newDepartment = await inquirer.prompt({
                          type: 'input',
                          message: 'What is the new departments name?',
                          name: 'name',
                          validate: (answer) => answer !== ""
                       })
                       console.table(await handler.addDepatartment(newDepartment.name))
                       break;
                case 'Add Role':
                    const newRole = await inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the new roles title',
                            name: 'name',
                            validate: (answer) => answer !== ""
                        },
                        {
                            type: 'number',
                            message: 'How much does the position earn',
                            name: 'salary',
                            validate: (answer) => answer !== ""
                        },
                        {
                            type: 'number',
                            message: 'What department does the role belong to?',
                            name: 'department',
                            validate: (answer) => answer !== ""
                        }
                    ])
                    console.table(await handler.addRole(newRole.name, newRole.salary, newRole.department))
                    break;
                case 'Add Employee':
                    const newEmployee = await inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the new employees first name?',
                            name: 'first_name',
                            validate: (answer) => answer !== ""
                        },
                        {
                            type: 'input',
                            message: 'What is the employees last name?',
                            name: 'last_name',
                            validate: (answer) => answer !== ""
                        },
                        {
                            type: 'number',
                            message: 'What is the employees role id?',
                            name: 'role',
                            validate: (answer) => answer !== ""
                        },
                        {
                            type: 'number',
                            message: 'Who is the employees manager?',
                            name: 'manager',
                            validate: (answer) => answer !== ""
                        }
                    ])
                    console.table(await handler.addEmployee(newEmployee.first_name, newEmployee.last_name, newEmployee.role, newEmployee.manager))
                    break;
                case 'Quit':
                    connection.destroy()
                    process.exit(0)
                default:
                    break;        
            }
        }
    } catch (error) {
        if (error) console.log(error)
    }
}

start()
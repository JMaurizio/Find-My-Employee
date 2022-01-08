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
                    'Delete Department',
                    'Delete Role',
                    'Delete Employee',
                    'Display Employees by Manager',
                    'Display Employees by Department',
                    'Update Employee Role',
                    'Update Employee Manager',
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
                            name: 'manager'
                        }
                    ])
                    console.table(await handler.addEmployee(newEmployee.first_name, newEmployee.last_name, newEmployee.role, newEmployee.manager))
                    break;

                case 'Delete Department':
                    console.table(await handler.allDepartments())
                    const deleteD = await inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What department would you like to remove?',
                            name: 'delete'
                        }
                    ])
                    console.table(await handler.deleteDepartment(deleteD.delete))
                    break;
                    
                case 'Delete Role':
                    console.table(await handler.allRoles())
                    const deleteR = await inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What role would you like to remove?',
                            name: 'delete'
                        }
                    ])
                    console.table(await handler.deleteRole(deleteR.delete))
                    break;
                    
                case 'Delete Employee':
                    console.table(await handler.allEmployees())
                    const deleteE = await inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What employee would you like to remove?',
                            name: 'delete'
                        }
                    ])
                    console.table(await handler.deleteEmployee(deleteE.delete))
                    break; 
                 
                case 'Display Employees by Manager':
                    console.table(await handler.displayByManager())
                    break;

                case 'Display Employees by Department':
                    console.table(await handler.displayByDepartment())
                    break;    

                case 'Update Employee Role':
                    console.table(await handler.allEmployees())
                    const updateEmployee = await inquirer.prompt([
                        {
                           type: 'input',
                           message: 'Please enter the id of the employee you would like to update?',
                           name: 'employee' 
                        }
                    ])
                    console.table(await handler.allRoles())
                    const updateRole = await inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Please enter the role you would like to give them?',
                            name: 'role'
                        }
                    ])
                    console.table(await handler.updateEmployee(updateRole.role, updateEmployee.employee))
                    break;
                    
                case 'Update Employee Manager':
                    console.table(await handler.allEmployees())
                    const updateManager = await inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the id of the employee you would like to assign a new manager?',
                            name: 'employee'
                        },
                        {
                            type: 'input',
                            message: 'What is the id of the new manager?',
                            name: 'manager'
                        }
                    ])
                    console.table(await handler.updateManager(updateManager.manager, updateManager.employee))
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
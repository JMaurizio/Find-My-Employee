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
                    console.table()
                    break;
                case 'View All Employees':
                    console.table()
                    break;
                case 'Add Department':
                      const newDepartment = await inquirer.prompt({
                          type: 'input',
                          message: 'What is the new departments name?',
                          name: 'name',
                          validate: (answer) => answer !== ""
                       })
                       console.table()
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
                            value: 'number',
                            validate: (answer) => answer !== ""
                        },
                        {
                            type: 'number',
                            message: 'What department does the role belong to?',
                            value: 'number',
                            validate: (answer) => answer !== ""
                        }
                    ])
                    console.table()
                    break;
                case 'Add Employee':
                    const newEmployee = await inquirer.prompt([
                        {
                            
                        }
                    ])
                case 'Quit':
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
const inquirer = require('inquirer');
const cTable = require('console.table');
const choiceHandler = require('./db/db');

async function start() {
    try {
        const handler = new choiceHandler()
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
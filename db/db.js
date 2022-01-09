class choiceHandler {
    constructor(db) {
        this.db = db
    }

    async allDepartments() {
        const sql = `SELECT * FROM department`;
        const [rows] = await this.db.execute(sql)
        return rows
    }

    async allRoles() {
        const sql = `SELECT * FROM roles`;
        const [rows] = await this.db.execute(sql)
        return rows
    }

    async allEmployees() {
        const sql =`
            SELECT e.id, e.first_name, e.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e
			LEFT JOIN roles ON e.roles_id = roles.id
			LEFT JOIN department ON roles.department_id = department.id
			LEFT JOIN employee m ON m.id = e.manager_id
        `;
        const [rows] = await this.db.execute(sql)
        return rows
    }

    async addDepatartment(department) {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const [result] = await this.db.execute(sql, [department])
        return this.allDepartments()
    }

    async addRole(title, salary, department_id) {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const[result] = await this.db.execute(sql, [title, salary, department_id])
        return this.allRoles()
    } 

    async addEmployee(first_name, last_name, roles_id, manager_id) {
        const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;
        const[result] = await this.db.execute(sql, [first_name, last_name, roles_id, manager_id])
        return this.allEmployees()
    }

    async deleteDepartment(id) {
        const sql = `DELETE FROM department WHERE id = ?`;
        const [result] = await this.db.execute(sql, [id])
        return this.allDepartments
    }

    async deleteRole(id) {
        const sql = `DELETE FROM roles WHERE id = ?`;
        const [result] = await this.db.execute(sql, [id])
        return this.allRoles
    }

    async deleteEmployee(id) {
        const sql = `DELETE FROM employee WHERE id = ?`;
        const [result] = await this.db.execute(sql, [id])
        return this.allEmployees
    }

    async displayByManager() {
        const sql =`
            SELECT e.id, e.first_name, e.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e
			LEFT JOIN roles ON e.roles_id = roles.id
			LEFT JOIN department ON roles.department_id = department.id
			LEFT JOIN employee m ON m.id = e.manager_id
            ORDER BY manager
        `;
        const [rows] = await this.db.execute(sql)
        return rows
    }

    async displayByDepartment() {
        const sql =`
            SELECT e.id, e.first_name, e.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e
			LEFT JOIN roles ON e.roles_id = roles.id
			LEFT JOIN department ON roles.department_id = department.id
			LEFT JOIN employee m ON m.id = e.manager_id
            ORDER BY department
        `;
        const [rows] = await this.db.execute(sql)
        return rows
    }

    async updateEmployee(roles_id, id) {
        const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
        const[result] = await this.db.execute(sql, [roles_id, id])
        return this.allEmployees()
    }

    async updateManager(manager_id, id) {
        const sql = `UPDATE employee SET manager_id =? WHERE id = ?`;
        const [result] = await this.db.execute(sql, [manager_id, id])
        return this.allEmployees()
    }
}

module.exports = choiceHandler;
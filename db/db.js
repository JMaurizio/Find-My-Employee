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

    async addRole(roles) {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const[result] = await this.db.execute(sql, [roles])
        return this.allRoles()
    } 

    async addEmployee(employee) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const[result] = await this.db.execute(sql, [employee])
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

    async updateEmployee(employee) {
        const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
        const[result] = await this.db.execute(sql, [employee])
        return this.allEmployees()
    }
}

module.exports = choiceHandler;
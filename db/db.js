const dbConfig = require('../db/dbConfig');
const mysql = require('mysql2/promise');

class choiceHandler {
    async connection() {
        const db = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database
        });
        console.log('Connected to company database.')
        return db
    }

    async allDepartments() {
        const db =await this.connection()
        const sql = `SELECT * FROM departments`;
        const [rows] = await db.execute(sql)
        db.destroy()
        return rows
    }
}

module.exports = choiceHandler;
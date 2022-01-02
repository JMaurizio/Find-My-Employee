class choiceHandler {
    constructor(db) {
        this.db = db
    }

    async allDepartments() {
        const sql = `SELECT * FROM department`;
        const [rows] = await this.db.execute(sql)
        return rows
    }
}

module.exports = choiceHandler;
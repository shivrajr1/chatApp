const { db } = require("../../config/db");
const CustomErr = require('../../uitl/err')

module.exports = async (req, res) => {
    const { username, email, password } = req.body;

    const q1 = `SELECT * FROM users WHERE username = ?`;
    const [existingUsers] = await db.query(q1, [username]);

    if (existingUsers.length > 0) {
        throw new CustomErr(400, "user already exists")
    }

    const q2 = `INSERT INTO users(username, email, password_hash) VALUES (?, ?, ?)`;
    const [insertResult] = await db.query(q2, [username, email, password]);

    req.session.user = { id: insertResult.insertId, username, email };

    return res.status(200).send(req.session.user);
}

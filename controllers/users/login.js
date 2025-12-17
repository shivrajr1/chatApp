const { db } = require("../../config/db"); // should be a pool
const CustomErr = require('../../uitl/err');

module.exports = async (req, res) => {

    const q = `SELECT * FROM users WHERE username = ?`;
    const [result] = await db.query(q, [req.body.username]);

    if (result.length !== 0 && result[0].password_hash === req.body.password) {
        req.session['user'] = result[0];
        return res.status(200).send(result[0]);
    } else {
        throw new CustomErr(400, 'username or password incorrect');
    }
};

const { db } = require("../../config/db");
const CustomErr = require("../../uitl/err");

module.exports = async (req, res) => {

    if (!req.session.user) {
        throw new CustomErr(401, 'unauthorised')
    }
        const userId = req.session.user.id;

    const q = `
      SELECT id, username, email
      FROM users 
      WHERE id != ?
    `;
    
    const [users] = await db.query(q, [userId]);
    return res.status(200).send(users);
};

const { db } = require("../../config/db");
const CustomErr = require("../../uitl/err");

module.exports = async (req, res) => {
    const {withUser}=req.body
    if (!req.session.user) {
        throw new CustomErr(401, 'unautherise')
    }
    const userId = req.session.user.id;
    const q = `
      SELECT * FROM messages
      WHERE (sender_id = ? AND receiver_id = ?) 
         OR (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC
    `;    
    const [messages] = await db.query(q, [userId, withUser, withUser, userId]);
    return res.status(200).send(messages);
};
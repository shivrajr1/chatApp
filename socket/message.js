const { db } = require("../config/db");

module.exports = async (io, socket, data, users) => {
    try {
        const sessionUser = socket.request.session?.user;
        if (!sessionUser) {
            return socket.emit("error", "unauthorised");
        }

        const { toUser, message } = data;
        const fromUser = sessionUser.username;

        const q1 = `
            SELECT id, username
            FROM users
            WHERE username IN (?, ?)
        `;

        const [result] = await db.query(q1, [fromUser, toUser]);

        if (result.length !== 2) {
            return socket.emit("error", "invalid users");
        }

        const sender = result.find(u => u.username === fromUser);
        const receiver = result.find(u => u.username === toUser);

        const q2 = `
            INSERT INTO messages (message, sender_id, receiver_id)
            VALUES (?, ?, ?)
        `;

        await db.query(q2, [message, sender.id, receiver.id]);

        
        if (users.has(toUser)) {
            io.to(users.get(toUser)).emit("message", {
                from: fromUser,
                message
            });
        }

        socket.emit("message", {
            to: toUser,
            message
        });

    } catch (err) {
        console.error(err);
        socket.emit("error", "something went wrong");
    }
};

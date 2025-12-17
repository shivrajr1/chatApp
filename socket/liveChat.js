
const message = require("./message");

module.exports = (io, socket, users) => {
    const sessionUser = socket.request.session?.user;
    if (!sessionUser) return;

    users.set(sessionUser.username, socket.id);

    socket.on("message", (data) => {
        message(io, socket, data, users);
    });

    socket.on("disconnect", () => {
        users.delete(sessionUser.username);
    });
};

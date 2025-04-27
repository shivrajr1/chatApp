const { db } = require("../config/db")

module.exports = (io, socket, data, users) => {
    // if(typeof socket.request.session.user=="undefined"){
    //     io.to(socket.id).emit("error","unauthorised");
    //     return;
    // }
    // let query = `SELECT * FROM users WHERE usrname IN ('${data.user}','${data.toUser}');`
    // db.query(query, (err, result) => {
    //     if (err) {
    //        return io.to(socket.id).emit("error","something went wrong");
    //     }
    //     if (result.length == 2) {
    //         let q = `insert into messages (message,sender_id,receiver_id) value ?`
    //         db.query(q, [data.message, result[0].id, result[1].id], (err) => {
    //             if (err) {
    //                 return io.to(socket.id).emit("error","something went wrong");
    //              }
    //         })
            // if(users.has(data.toUser)){
            //     return io.to(users[data.toUser]).emit("message",data.message);
            // }
            io.emit("message",data.toUser);
    //     }else{
    //         return io.to(socket.id).emit("error","something went wrong");
    //     }
    // })

}
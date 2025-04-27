
const message = require("./message");

module.exports=(io,socket,users)=>{
    // if(typeof socket.request.session.user!=="undefined" && !users.has(socket.request.session.user.username)
    // ){users[socket.request.session.user.username]=socket.id;}

    socket.on("message",(data)=>{message(io,socket,data,users)})
    
    socket.on("disconnect",()=>{
        if(typeof socket.request.session.user!=="undefined"){
           delete users[socket.request.session.user.username];
        }
    })
}
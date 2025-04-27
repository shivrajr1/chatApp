require("dotenv").config();

const express=require("express");
const cors=require("cors")
const http=require("http");
const {db_connection}=require("./config/db");
const socket=require("socket.io");
const session = require('express-session');
const userRouter=require("./routers/user");
const dataRouter=require("./routers/data");
const CustomErr = require("./uitl/err");
const liveChat=require("./socket/liveChat")

const app=express();
const server=http.createServer(app);
const io=socket(server,{
    cors:{
    origin:process.env.vite_url,
    methods:["get","post"],
    credentials:true
}});


const sessionOption=session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        secure: false
     }
  })
db_connection();

app.use(cors({
    origin:process.env.vite_url,
    methods:["get","post"],
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(sessionOption)
  io.use((socket, next) => {
    sessionOption(socket.request, socket.request.res || {}, next);
  });


app.use("/user",userRouter);
app.use("/data",dataRouter);
app.all("*",()=>{
    throw new CustomErr(404,"page not found");
})

let users=new Map();
io.on("connection",(socket)=>{liveChat(io,socket,users)})

app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.status(status).send(message);
})
const port=process.env.port||4000;
server.listen(port,()=>{
    console.log(`${port} server listing..`)
})
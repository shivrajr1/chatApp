require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const session = require("express-session");
const socketIO = require("socket.io");

const { db_connection } = require("./config/db");
const userRouter = require("./routers/user");
const dataRouter = require("./routers/data");
const CustomErr = require("./uitl/err");
const liveChat = require("./socket/liveChat");

const app = express();
const server = http.createServer(app);


const io = socketIO(server, {
    cors: {
        origin: process.env.VITE_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

const sessionOption = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
    }
});

db_connection();

app.use(cors({
    origin: process.env.VITE_URL,
    methods: ["GET", "POST","DELETE"],
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionOption);


app.use("/user", userRouter);
app.use("/data", dataRouter);


app.all("*", (req, res, next) => {
    next(new CustomErr(404, "page not found"));
});


io.use((socket, next) => {
    sessionOption(socket.request, socket.request.res || {}, () => {
        if (!socket.request.session?.user) {
            return next(new Error("unauthorised"));
        }
        next();
    });
});



const users = new Map();

io.on("connection", (socket) => {
    liveChat(io, socket, users);
});


app.use((err, req, res, next) => {
    const { status = 500, message = "something went wrong" } = err;
    res.status(status).send(message);
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`${port} server listening...`);
});

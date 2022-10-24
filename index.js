require("dotenv").config();
console.clear();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  notFoundErrorHandler,
  errorHandler,
} = require("./middlewares/error.handler");

// ! Controllers
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
const messageRouter = require("./router/messageRouter");

// ! EJS
app.set("view engine", "ejs");

// ! Accepting requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ! Static Folders
app.use(express.static(path.join(__dirname, "public")));

// ! socket.io Setups

const server = require("http").createServer(app);
const io = require("socket.io")(server);
global.io = io;
// ! Cookie Parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// ! Route Setups
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);
app.use("/message", messageRouter);

// ! Error Handler
app.use(notFoundErrorHandler, errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

// => Database Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongoDB has been connected!");
  })
  .catch((err) => console.error(err));

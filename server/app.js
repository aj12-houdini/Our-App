const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/build"));

const server = app.listen(8000, () => {
  console.log("Server started on port 8000");
});

const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  console.log(username)
  socket.username = username;
  next();
}).on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  const users = [];

  for (let [id, socket] of io.of("/").sockets) {
    console.log(id)
    users.push({
      userId: id,
      username: socket.username,
    });
  }
  console.log(users);
  socket.emit("users", users);
  socket.broadcast.emit("user connected", {
    username: socket.username,
    userId: socket.id,
  });

  socket.on("private_chat", function (data) {
    const to = data.to,
      message = data.message;
    console.log(to);
    socket.to(to).emit("private_chat", {
      //The sender's username
      username: socket.username,
      //Message sent to receiver
      message: message,
    });
  });
  socket.on("newUser", (data) => {
    users[data.username] = data.username;
    socket.username = socket;
    console.log("New user signed in");
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/home", (req, res) => {
  res.json({ message: "Hello from react" });
});

app.use(require("./controller/controller.js"));
app.use(require("./router/routers.js"));

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

let users = {}

const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('private_chat',function(data){
    const to = data.to,
            message = data.message;

    if(users.hasOwnProperty(to)){
        io.emit('private_chat',{
            //The sender's username
            username : socket.username,

            //Message sent to receiver
            message : message
        });
    }

});

  socket.on("newUser", (data) => {
    users[data.username]= data.username
    socket.username = socket
    console.log("New user signed in")
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

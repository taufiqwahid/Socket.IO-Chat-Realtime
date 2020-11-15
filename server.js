var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

connections = [];

server.listen(3000, () => {
  console.log("Server is Running 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", (socket) => {
  connections.push(socket);
  console.log(`Terhubung ${connections.length} sockets sedang terhubung`);

  //disconnect
  socket.on("disconnect", (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Terputus ${connections.length}`);
  });

  //Send message
  socket.on("send message", (data) => {
    io.sockets.emit("new message", { msg: data });
  });
});

// var app = require("express")();
// var http = require("http").Server(app);
// var io = require("socket.io")(http);
// var port = process.env.PORT || 3000;

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// io.on("connection", function (socket) {
//   socket.on("chat message", function (msg) {
//     io.emit("chat message", msg);
//   });
// });

// http.listen(port, function () {
//   console.log("listening on *:" + port);
// });

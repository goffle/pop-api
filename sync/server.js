var http = require("http");
var fs = require("fs");
const Sync = require("./sync.js");
let previousMessages = [];
// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
  fs.readFile("./index.html", "utf-8", function(error, content) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});

// Loading socket.io
var io = require("socket.io").listen(server);

function getObject(collection) {
  switch (collection) {
    case "joconde":
      return require("../src/models/joconde.js");
    case "mnr":
      return require("../src/models/mnr.js");
    case "merimee":
      return require("../src/models/merimee.js");
    case "palissy":
      return require("../src/models/palissy.js");
    case "memoire":
      return require("../src/models/memoire.js");
    default:
      return null;
  }
}

// When a client connects, we note it in the console
io.sockets.on("connection", socket => {
  previousMessages.map(a => {
    socket.emit("message", a);
  });

  socket.on("cmd", args => {
    socket.emit("message", `Got ${args.join(" ")}`);

    if (args[0] === "sync") {
      const obj = getObject(args[1]);
      if (obj) {
        Sync(obj, args[1], 0, msg => {
          broadCastMessage(msg);
        });
      }
    }
  });
});

function broadCastMessage(message) {
  previousMessages.push(`${getDateTime()} - ${message}`);
  if (previousMessages.length > 20) {
    previousMessages.pop();
  }
  io.emit("message", `${getDateTime()} - ${message}`);
}

function getDateTime() {
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

server.listen(8081);

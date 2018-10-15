var socket = require("socket.io-client")("pop-sync-staging.eu-west-3.elasticbeanstalk.com:8081");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

socket.on("message", data => {
  console.log(data);
});

rl.on("line", input => {
  const arr = input.split(" ");
  socket.emit("cmd", arr);
});

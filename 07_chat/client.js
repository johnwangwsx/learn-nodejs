const net = require("net");
var readline = require("readline");
const client = net.createConnection(
  { host: "localhost", port: 3000 },
  function () {
    console.log("连接到服务器！");

    process.stdin.setEncoding("utf-8");

    const read = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    read.on("line", (chunk) => {
      client.write(chunk);
    });
  }
);
client.on("data", function (data) {
  console.log(data.toString());
});

client.on("close", function () {
  console.log("断开与服务器的连接");
});

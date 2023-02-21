const net = require("net");

let count = 0;
const users = {};

const server = net.createServer((con) => {
  let nickname;
  con.write(
    "\n > welcome to \033[92mchat\033[39m!" +
      " > " +
      count +
      " other people are connected at this time." +
      " > please write your name and press enter: "
  );

  con.setEncoding("utf-8");

  con.on("close", () => {
    count--;
  });
  count++;
  con.on("data", (data) => {
    console.log(data.toString().trim());
    if (!nickname) {
      users[data] = con;
      nickname = data;
      for (const user in users) {
        if (user !== nickname) {
          users[user].write(nickname + " online\n");
        }
      }
    } else {
      for (const user in users) {
        users[user].write(nickname + " : " + data + "\n");
      }
    }
  });
});

server.listen(3000, () => {
  console.log("running");
});

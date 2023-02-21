// 实现一个web服务器
const http = require("http");
const fs = require("fs");

function serve(path, res) {
  fs.createReadStream(path).pipe(res);
}

http
  .createServer((req, res) => {
    if (req.url.includes("/images") && req.url.substr(-4) === ".jpg") {
      const url = __dirname + "/" + req.url;
      // 此处还应该添加判断文件是否存在以及是否是一个文件的代码 fs.stat
      serve(url, res);
    } else if (req.url === "/") {
      serve(__dirname + "/index.html", res);
    }
  })
  .listen(3000);

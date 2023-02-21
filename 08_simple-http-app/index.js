const http = require("http");
const qs = require("querystring");
http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    if (req.url === "/") {
      res.end(
        '<form method="post" action="/form"><p>Please input your name</p><input type="text" name="username"/><button type="submit">submit</button></form>'
      );
    } else if (req.url === "/form") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        console.log(body);
        res.end(
          `<p>Your username ${qs.parse(body).username}.method=${req.method}</p>` //解析查询字符串
        );
      });
    } else {
      res.writeHead(404);
      res.end("Not Found."); //处理url不匹配的情况
    }
  })
  .listen(3000, () => {
    console.log("This server is running at 3000 port.");
  });

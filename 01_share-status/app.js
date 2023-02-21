const express = require("express");

const app = express();

let books = ["first book", "second book"];

// 不同的两个请求是同一个process处理的，他们共享一样的状态，需要避免写出下面的代码
app.get("/books", (_, res) => {
  const htmlStr = `<div style='color: red'>${books.join("<br />")}<div/>`;
  books = [];
  res.send(htmlStr);
});

app.listen(3000, () => {
  console.log("running");
});

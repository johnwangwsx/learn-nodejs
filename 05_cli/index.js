const fs = require("fs");

fs.readdir(process.cwd(), (err, files) => {
  console.log("");
  if (!files.length) {
    return console.log("\t\033[31m No files to show!\033[39\n");
  }
  console.log("\tSelect which file or directory you want to see.\n");

  const statList = [];
  for (const [index, fileName] of Object.entries(files)) {
    fs.stat(process.cwd() + "/" + fileName, (err, stat) => {
      statList.push(stat);
      if (stat.isDirectory()) {
        console.log("\t" + index + "\t\033[36m" + fileName + "\033[39m");
      } else {
        console.log("\t" + index + "\t\033[90m" + fileName + "\033[39m");
      }
    });
  }
  console.log("");
  process.stdout.write("\t\033[33mEnter your choice: \033[39m\n");
  process.stdin.resume();
  process.stdin.setEncoding("utf-8");
  process.stdin.on("data", (data) => {
    if (!files[Number(data)]) {
      process.stdout.write("\t\033[31mEnter your choice: \033[39m");
    } else {
      process.stdin.pause();
      if (statList[Number(data)].isDirectory()) {
        console.log("fff");
        fs.readdir(process.cwd() + "/" + files[Number(data)], (err, files) => {
          console.log("");
          console.log("\t(" + files.length + " files)");
          files.forEach((file) => {
            console.log("\t-\t" + file);
          });
          console.log("");
        });
      } else {
        fs.readFile(
          process.cwd() + "/" + files[Number(data)],
          "utf-8",
          (err, data) => {
            console.log("");
            console.log(
              "\033[90m" + data.replace(/(.*)/g, "\t$1") + "\033[39m"
            );
          }
        );
      }
    }
  });
});

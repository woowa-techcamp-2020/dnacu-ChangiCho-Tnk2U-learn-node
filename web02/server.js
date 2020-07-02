const http = require("http");
const fs = require("fs");
const url = require("url");

const html = fs.readFileSync("./index.html", "utf8");
const board = fs.readFileSync("./board.html", "utf8");

http
  .createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;

    console.log("Request for " + pathname + " received.");
    if (pathname === "/write" && request.method === "GET") {
      console.log("send index");
      response.write(html.toString());
    } else if (pathname === "/write" && request.method === "POST") {
      // request.
      let body = [];
      request
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString().split("=");

          let [key, value] = [body[0], body[1]];

          fs.writeFileSync("./data.txt", value, (err) => {
            console.log(err);
          });

          response.write(html.toString());
        });
    } else if (pathname === "/board" && request.method === "GET") {
      let data = fs.readFileSync("./data.txt", "utf8");
      const ret = board.toString().replace("data", data.toString());

      response.write(ret);
    }
  })
  .listen(3000);

console.log("server on");

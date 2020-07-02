const http = require("http");
const fs = require("fs");
const url = require("url");

const html = fs.readFileSync("index.html", "utf8");

// console.log(html.toString());

http
  .createServer(function (request, response) {
    // URL 뒤에 있는 디렉토리/파일이름 파싱
    // console.log(request.method);

    var pathname = url.parse(request.url).pathname;

    console.log("Request for " + pathname + " received.");
    if (pathname === "/" && request.method === "GET") {
      console.log("send index");
      response.write(html.toString());
    } else if (pathname === "/" && request.method === "POST") {
      // request.

      const text = fs.readFileSync("data.txt", "utf8");

      // fs.writeFileSync("data.txt",text.toString())
    }
  })
  .listen(3000);

console.log("server on");

const net = require("net");
const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

// 서버를 생성
const server = net.createServer(function (socket) {
  console.log(socket.address().address + " connected.");

  // client와 접속이 끊기는 메시지 출력
  socket.on("close", function () {
    console.log("client disconnted.");
  });
  // client가 접속하면 화면에 출력해주는 메시지
  socket.write(html.toString());
});

// 에러가 발생할 경우 화면에 에러메시지 출력
server.on("error", function (err) {
  console.log("err" + err);
});

server.listen(80, function () {
  console.log("linsteing on 80");
});

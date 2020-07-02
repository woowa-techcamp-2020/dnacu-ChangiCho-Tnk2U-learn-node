const fs = require("fs");
const net = require("net");

// 연결 성사 시 실행되는 callback function
const connectHandler = (socket) => {
  // { port: 12346, family: 'IPv4', address: '127.0.0.1' } 객체 리턴
  const { port, address } = socket.address();
  console.log(`${address} connected.`);

  // index.html 파일을 읽어 client측으로 전송한다.
  fs.readFile("public/index.html", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    // 200 http response와 함께 index.html의 내용을 전송한다.
    socket.write("HTTP/2.0 200 OK\r\n" + "\r\n");
    socket.write(data);
    socket.end();
  });
};

// server 생성
const server = net.createServer(connectHandler);

// 주로 지정한 포트에 이미 서버가 동작중일 때 발생한다.
// 'lsof -i tcp:[PORT_NUM]' 명령어로 PID 확인 후 'kill -9 [PID]' 실행하면 해결된다.
server.on("error", function (err) {
  console.log("err" + err);
});

// 지정한 host 및 port에서의 연결을 받는다.
server.listen(3000, () => console.log("listening on 3000..."));

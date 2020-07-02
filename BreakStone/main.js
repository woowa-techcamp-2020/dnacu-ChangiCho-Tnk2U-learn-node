var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



// 사용자 커멘드 값
var rightPressed = false;
var leftPressed = false;

// 벽돌정보

//게임 스코어 정보
var score = 0;
var lives = 3;

//벽돌 위치와 개수를 배정하기 위한 초기화 반복문

// 조작을 위한 키맵핑
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) { // 마우스 좌표가 캔버스 안에 있으면 
        paddle.paddleX = relativeX - paddle.paddleWidth / 2;
    }
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    brick.drawBricks();
    ball.drawBall();
    paddle.drawPaddle();
    drawScore();
    drawLives();
    brick.collisionDetection();

    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = - ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = - ball.dy;
    }
    else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.paddleX && ball.x < paddle.paddleX + paddle.paddleWidth) {
            ball.dy = -ball.dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                ball.x = canvas.width / 2;
                ball.y = canvas.height - 30;
                ball.dx = 3;
                ball.dy = -3;
                paddle.paddleX = (canvas.width - paddle.paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddle.paddleX < canvas.width - paddle.paddleWidth) {
        paddle.paddleX += 7;
    }
    else if (leftPressed && paddle.paddleX > 0) {
        paddle.paddleX -= 7;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
    requestAnimationFrame(draw);
}

class Ball {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }

    drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

}

class Brick {
    constructor() {
        this.brickRowCount = 5;
        this.brickColumnCount = 3;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;
        this.bricks = [];
        // this.ball = ball;

        for (var c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for (var r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    collisionDetection() {

        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                let b = this.bricks[c][r];
                if (b.status == 1) {
                    if (
                        ball.x > b.x &&
                        ball.x < b.x + this.brickWidth &&
                        ball.y > b.y &&
                        ball.y < b.y + this.brickHeight
                    ) {
                        ball.dy = -ball.dy;
                        b.status = 0;
                        score++;
                        if (score == this.brickRowCount * this.brickColumnCount) {
                            alert("YOU WIN, CONGRATS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    drawBricks() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                if (this.bricks[c][r].status == 1) {
                    let brickX =
                        r * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                    let brickY =
                        c * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;

                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;

                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}

class Paddle {
    constructor(paddleWidth, paddleHeight, paddleX) {
      this.paddleWidth = paddleWidth;
      this.paddleHeight = paddleHeight;
      this.paddleX = paddleX;
    }
    drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        this.paddleX,
        canvas.height - this.paddleHeight,
        this.paddleWidth,
        this.paddleHeight
      );
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
  
// 판때기 크기 밎 좌표(x값만)
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

const paddle = new Paddle(paddleWidth, paddleHeight, paddleX);
const ball = new Ball(canvas.width / 2, canvas.height - 30, 4, 4, 10);
const brick = new Brick();


draw();

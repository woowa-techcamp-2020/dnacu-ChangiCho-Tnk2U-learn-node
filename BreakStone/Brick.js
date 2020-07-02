class Brick {
  constructor(ball) {
    this.brickRowCount = 5;
    this.brickColumnCount = 3;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    this.ball = ball;

    for (var c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (var r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  collisionDetection() {
    let ball = this.ball;

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

  drawBricks(ctx) {
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
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}

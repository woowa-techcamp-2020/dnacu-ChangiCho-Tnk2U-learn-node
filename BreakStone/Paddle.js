export default class Paddle {
    constructor(paddleWidth = 10, paddleHeight = 75, paddleX) {
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;

        this.paddleX = paddleX;
    }

    draw(canvas, ctx) {
        ctx.beginPath();
        ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
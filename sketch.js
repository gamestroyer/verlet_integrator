
let count = 100;
let balls = [];
let sub_step = 8;
let frame = 0;

function setup() {
    createCanvas(500, 500);
    noStroke();
    frameRate(120);
}

function draw() {
    background(30, 40, 100);

    fill(50, 60, 120);
    ellipse(width / 2, height / 2, width, height);

    if (balls.length < count) {
        let newBall = new Ball(random(100, 200), random(100, 200), random(5, 15));
        newBall.accelarate(0, 10000);
        balls.push(newBall);
    }

    let subDt = deltaTime / sub_step;
    for (let i = 0; i < sub_step; i++) {
        applyGravity();
        applyConstraints();
        solveCollision();
        updatePos(subDt);
    }
    show();

    frame++;
}

function show() {
    for (let ball of balls) {
        ball.show();
    }
}

function updatePos(dt) {
    for (let ball of balls) {
        ball.update(dt / 1000);
    }
}

function applyGravity() {
    for (let ball of balls) {
        ball.accelarate(0, 500);
    }
}

function applyConstraints() {
    for (let ball of balls) {
        ball.bounds();
    }
}


// A function that solves collisions between balls
function solveCollision() {
    for (let i = 0; i < balls.length; i++) {
        let ball1 = balls[i];
        for (let j = i + 1; j < balls.length; j++) {
            let ball2 = balls[j];
            let vec = createVector(ball1.pos.x - ball2.pos.x, ball1.pos.y - ball2.pos.y);
            let d = vec.mag();
            if (d < ball1.r + ball2.r) {
                vec.normalize();
                let overlap = (ball1.r + ball2.r) - d;
                ball1.pos.x += vec.x * overlap * 0.5;
                ball1.pos.y += vec.y * overlap * 0.5;
                ball2.pos.x -= vec.x * overlap * 0.5;
                ball2.pos.y -= vec.y * overlap * 0.5;
            }
        }
    }
}

function collision() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            balls[i].collide(balls[j]);
        }
    }
}

class Ball extends VerletObject {
    constructor(x, y, r) {
        super(x, y);
        this.r = r
        this.colour = [random(255/2, 255), random(255/2, 255), random(255/2)];
    }
    show() {
        fill(this.colour[0], this.colour[1], this.colour[2]);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
    bounds() {
        let vec = this.pos.copy().sub(createVector(width / 2, height / 2));
        let d = vec.mag();
        if (d > (width / 2) - this.r) {
            vec.div(d);
            this.pos = createVector(width / 2, height / 2).add(vec.mult(width/2 - this.r));
        }
    }
    collide(other) {
        let vec = createVector(this.pos.x - other.pos.x, this.pos.y - other.pos.y);
        let d = vec.mag();
        if (d < this.r + other.r) {
            vec.normalize();
            let overlap = (this.r + other.r) - d;
            this.pos.x += vec.x * overlap * 0.5;
            this.pos.y += vec.y * overlap * 0.5;
            other.pos.x -= vec.x * overlap * 0.5;
            other.pos.y -= vec.y * overlap * 0.5;
        }
    }
}

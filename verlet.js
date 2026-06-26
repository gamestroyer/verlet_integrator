class VerletObject {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.oldPos = this.pos.copy();
        this.a = createVector(0, 0);
    }
    update(dt) {
        let velocity = p5.Vector.sub(this.pos, this.oldPos);
        this.oldPos = this.pos.copy();
        this.pos.add(velocity.add(this.a.mult(dt * dt)));
        this.a = createVector(0, 0);
    }
    accelarate(ax, ay) {
        this.a.add(createVector(ax, ay));
    }
}
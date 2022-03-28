const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); //Canvas Context

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const GRAVITY = 0.2;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    //if sprite is touching the ground
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      //if sprite is not touching the ground, it will fall
    } else {
      this.velocity.y += GRAVITY;
    }
  }
}

const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
});

const enemy = new Sprite({
  position: { x: canvas.width - 50, y: 0 },
  velocity: { x: 0, y: 0 },
});

console.log("player", player);

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  console.log("animating");
  player.update();
  enemy.update();
}

animate();

window.addEventListener("keydown", (event) => {
  console.log("keydown", event);
});

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); //Canvas Context

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const GRAVITY = 0.5;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey = null;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
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

const keys = {
  q: { pressed: false },
  d: { pressed: false },
  z: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  //   console.log("animating");
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  if (keys.q.pressed && player.lastKey === "q") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }
}

animate();

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "q":
      keys.q.pressed = true;
      player.lastKey = "q";
      break;
    case "z":
      player.velocity.y = -15;
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -15;
      break;
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  event.preventDefault();
  switch (event.key) {
    //player keys
    case "d":
      keys.d.pressed = false;
      break;
    case "q":
      keys.q.pressed = false;
      break;
  }

  switch (event.key) {
    // enemy keys
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});

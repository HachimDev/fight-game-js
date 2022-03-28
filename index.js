// Initialisation
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); //Canvas Context
const GRAVITY = 0.5;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./assets/background.png",
});
const player = new Fighter({
  position: { x: 20, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
});
const enemy = new Fighter({
  position: { x: canvas.width - 120, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 },
  color: "blue",
});

const keys = {
  q: { pressed: false },
  d: { pressed: false },
  z: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
};

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.draw();
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

  //detect for collision
  if (
    rectangularCollision({ rect1: player, rect2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 10;
    document.querySelector("#enemyHP").style.width = enemy.health + "%";
  }
  if (
    rectangularCollision({ rect1: enemy, rect2: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 10;
    document.querySelector("#playerHP").style.width = player.health + "%";
  }
  //end game based on HP
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy, timerId });
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
    case " ":
      player.attack();
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
    case "ArrowDown":
      enemy.attack();
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

function rectangularCollision({ rect1, rect2 }) {
  return (
    rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x && // if rect1's attack box is to the right of the enemy's position
    rect1.attackBox.position.x <= rect2.position.x + rect2.width && // if rect1's attack box is to the left of the enemy's position
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y && // if react1's attack box is below the enemy's position
    rect1.attackBox.position.y <= rect2.position.y + rect2.height // if rect1's attack box is above the enemy's position
  );
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#displayText").innerHTML = "Draw!";
  } else if (player.health > enemy.health) {
    console.log("player 1 wins");
    document.querySelector("#displayText").innerHTML = "Player 1 Wins!";
  } else {
    console.log("Player 2 wins");
    document.querySelector("#displayText").innerHTML = "Player 2 Wins!";
  }
}

let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

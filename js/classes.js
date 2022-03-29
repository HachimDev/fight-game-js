class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    frameMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = frameMax;
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 7;
    this.offset = offset;
  }

  //draws the sprite
  draw() {
    c.drawImage(
      this.image,
      (this.image.width / this.framesMax) * this.frameCurrent,
      0,
      this.image.width / this.framesMax,
      this.image.height,

      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent < this.framesMax - 1) {
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.framesElapsed++;

    this.animateFrames();
  }
}

// class Fighter
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    frameMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      position,
      imageSrc,
      scale,
      frameMax,
      offset,
    });

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey = null;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 6;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
    }

    console.log("this.sprites : ", this.sprites);
  }

  update() {
    this.draw();

    this.animateFrames();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    //if sprite is touching the ground
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      //if sprite is not touching the ground, it will fall
    } else {
      this.velocity.y += GRAVITY;
    }
  }
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  switchSprite(sprite) {
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.frameCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.frameCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.frameCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.frameCurrent = 0;
        }
        break;
    }
  }
}

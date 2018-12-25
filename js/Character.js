function Character(frame_set, delay) {

  this.count = 0; // Counts the number of game cycles since the last frame change.
  this.delay = delay; // The number of game cycles to wait until the next frame change.
  this.frame = 0; // The value in the sprite sheet of the sprite image / tile to display.
  this.frame_index = 0; // The frame's index in the current animation frame set.
  this.frame_set = frame_set; // The current animation frame set that holds sprite tile values.
  this.jumping = true;
  this.height = 80;
  this.width = 80;
  this.x = 0;
  this.y = 40 - 18;
  this.x_velocity = 0;
  this.y_velocity = 0;
  this.bullets = [];
  this.shootingTime = -10;
  this.isRightDirection = true;
  this.khatraWeapon = false;
  this.khatraBulletCounter = 10;
  var that = this;

  this.draw = function (ctx, sprite_sheet) {
    ctx.drawImage(images[IMAGE.ENEMY], that.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE,
      that.x, that.y, SPRITE_DEST_SIZE, SPRITE_DEST_SIZE);
  }

  this.change = function (frame_set, delay = 15) {

    if (this.frame_set != frame_set) {
      this.count = 0;
      this.delay = delay;
      this.frame_index = 0;
      this.frame_set = frame_set;
      this.frame = this.frame_set[this.frame_index];
    }
  }

  this.move = (controller, sprite_sheet, canvas) => {
    if (controller.up.active && !this.jumping) {
      controller.up.active = false;
      this.jumping = true;
      this.y_velocity -= 10.5;
    }

    if (controller.left.active) {
      this.change(sprite_sheet.frame_sets[2], 15);
      this.x_velocity -= 0.5;
      this.isRightDirection = false;
    }

    if (controller.right.active) {
      this.isRightDirection = true;
      this.change(sprite_sheet.frame_sets[1], 15);
      if (this.x <= canvas.width / 2)
        this.x_velocity += 0.10;
    }

    if (!controller.left.active && !controller.right.active && this.shootingTime > 0) {
      this.change(sprite_sheet.frame_sets[0], 20);

    }

    if (controller.space.active) {
      this.shootingTime = -10;
      this.shoot(sprite_sheet, canvas);
      controller.space.active = false;

      if (this.khatraWeapon) {
        var sound = new Audio('./sounds/Reload.wav');
        sound.volume = 1;
        sound.play();
      } else {
        var sound = new Audio('./sounds/Shoot1.wav');
        sound.play();
      }

    }

    this.shootingTime++;

    this.y_velocity += 0.25;

    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.x_velocity *= 0.9;
    this.y_velocity *= 0.9;

    //Player position on the screen with respect to the edges
    if (this.y + this.height > canvas.height - 80) {
      this.jumping = false;
      this.y = canvas.height - 80 - this.height;
      this.y_velocity = 0;
    }

    if (this.x + this.width < 0) {
      this.x = canvas.width;
    } else if (this.x > canvas.width) {
      this.x = -this.width;

    }

    this.update();
    this.draw(canvas.getContext('2d'), sprite_sheet);

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw();
    }
    if (this.khatraWeapon) {
      this.showKhatraBulletCount();
    }
  }

  this.change = function (frame_set, delay = 15) {
    //Change the fram set
    if (this.frame_set != frame_set) {

      this.count = 0; // Reset the count.
      this.delay = delay; // Set the delay.
      this.frame_index = 0; // Start at the first frame in the new frame set.
      this.frame_set = frame_set; // Set the new frame set.
      this.frame = this.frame_set[this.frame_index]; // Set the new frame value.
    }

  }

  this.update = function () {
    this.count++;

    if (this.count >= this.delay) {
      this.count = 0;
      this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
      this.frame = this.frame_set[this.frame_index]; // Change the current frame value.
    }
  }

  this.shoot = function (sprite_sheet) {
    this.change(sprite_sheet.frame_sets[4], 15);

    var bullet = new Bullet(this.x, this.y, ctx, this.isRightDirection, this.khatraWeapon);
    this.bullets.push(bullet);

    if (this.khatraWeapon) {
      this.khatraBulletCounter--;
    }
    if (this.khatraBulletCounter == 0) {
      this.khatraBulletCounter = 10;
      this.khatraWeapon = false;
    }
  }

  this.showKhatraBulletCount = () => {
    ctx.fillText(`Khatra: ${this.khatraBulletCounter}`, 650, 30);
  }
};
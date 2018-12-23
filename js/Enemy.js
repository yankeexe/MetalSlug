function Enemy(frame_set, delay) {
  this.count = 0; // Counts the number of game cycles since the last frame change.
  this.delay = delay; // The number of game cycles to wait until the next frame change.
  this.frame = 0; // The value in the sprite sheet of the sprite image / tile to display.
  this.frame_index = 0; // The frame's index in the current animation frame set.
  this.frame_set = frame_set; // The current animation frame set that holds sprite tile values.
  this.jumping = true;
  this.height = 80;
  this.width = 80;
  this.x = 700;
  this.y = 250;
  this.x_velocity = 0;
  this.y_velocity = 0;
  this.speed = .5;
  this.bullets = [];
  this.shootTimer = 0;
  this.randomTime = Math.floor(Math.random() * 100 + 80);
  this.life = 3;
  var that = this;

  this.draw = function (ctx, sprite_sheet) {
    ctx.drawImage(images[IMAGE.ENEMY], that.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE,
      that.x, that.y, SPRITE_DEST_SIZE, SPRITE_DEST_SIZE);
  };

  this.move = (pX, pY) => {
    this.shootTimer++;

    //move the enemy towards player
    this.rotation = Math.atan2(pY - this.y, pX - this.x);
    this.x += Math.cos(this.rotation) * this.speed;
    this.y += Math.sin(this.rotation) * this.speed;

    this.change(sprite_sheet.frame_sets[5], 15);
    this.update();

    this.draw(ctx, sprite_sheet);

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw();
    }

    if (this.shootTimer == this.randomTime) {
      this.shoot(sprite_sheet);

      var enemyShoot = new Audio('./sounds/Shoot.wav');
      enemyShoot.play();
      this.shootTimer = 0;
    }
  }

  this.change = function (frame_set, delay = 15) {
    if (this.frame_set != frame_set) {
      this.count = 0; // Reset the count.
      this.delay = delay; // Set the delay.
      this.frame_index = 0; // Start at the first frame in the new frame set.
      this.frame_set = frame_set; // Set the new frame set.
      this.frame = this.frame_set[this.frame_index]; // Set the new frame value.
    }
  };

  this.update = function () {
    this.count++;

    if (this.count >= this.delay) {
      this.count = 0;
      this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
      this.frame = this.frame_set[this.frame_index]; // Change the current frame value.
    }
  };

  this.shoot = function (sprite_sheet) {
    this.change(sprite_sheet.frame_sets[4], 15);
    var bullet = new Bullet(this.x, this.y, ctx);
    this.bullets.push(bullet);
  };
}
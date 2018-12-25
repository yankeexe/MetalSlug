function Explosion(frame_set, delay, x, y) {
  this.delay = delay; // The number of game cycles to wait until the next frame change.
  this.frame = 0; // The value in the sprite sheet of the sprite image / tile to display.
  this.frame_index = 0; // The frame's index in the current animation frame set.
  this.frame_set = frame_set;
  this.x = x;
  this.y = y;


  this.draw = function (ctx, sprite_sheet) {
    ctx.drawImage(images[IMAGE.ENEMY], this.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE,
      this.x, this.y, SPRITE_DEST_SIZE, SPRITE_DEST_SIZE);
    this.change(sprite_sheet.frame_sets[6], 15);
  };

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
}
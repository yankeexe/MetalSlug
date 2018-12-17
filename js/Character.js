(function () {

  const SPRITE_SIZE = 50;
  const SPRITE_DEST_SIZE = 80;

  var Character = function (frame_set, delay) {

    this.count = 0; // Counts the number of game cycles since the last frame change.
    this.delay = delay; // The number of game cycles to wait until the next frame change.
    this.frame = 0; // The value in the sprite sheet of the sprite image / tile to display.
    this.frame_index = 0; // The frame's index in the current animation frame set.
    this.frame_set = frame_set; // The current animation frame set that holds sprite tile values.

  };

  Character.prototype = {

    change: function (frame_set, delay = 15) {

      if (this.frame_set != frame_set) {

        this.count = 0; // Reset the count.
        this.delay = delay; // Set the delay.
        this.frame_index = 0; // Start at the first frame in the new frame set.
        this.frame_set = frame_set; // Set the new frame set.
        this.frame = this.frame_set[this.frame_index]; // Set the new frame value.

      }

    },

    update: function () {
      this.count++;

      if (this.count >= this.delay) {
        this.count = 0;
        this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
        this.frame = this.frame_set[this.frame_index]; // Change the current frame value.
      }
    }
  };

  var controller, display, loop, player, render, sprite_sheet, bullets, bgX, bgY;

  display = document.getElementById("ctz").getContext("2d");

  controller = {
    left: {
      active: false,
      state: false
    },
    right: {
      active: false,
      state: false
    },
    up: {
      active: false,
      state: false
    },
    space: {
      active: false,
      state: false
    },

    keyUpDown: function (event) {

      /* Get the physical state of the key being pressed. true = down false = up*/
      var key_state = (event.type == "keydown") ? true : false;

      switch (event.keyCode) {

        case 37: // left key

          if (controller.left.state != key_state) controller.left.active = key_state;
          controller.left.state = key_state;
          break;

        case 38: // up key

          if (controller.up.state != key_state) controller.up.active = key_state;
          controller.up.state = key_state;

          break;
        case 39: // right key

          if (controller.right.state != key_state) controller.right.active = key_state;
          controller.right.state = key_state;

          break;

        case 32: // space key

          if (controller.space.state != key_state) controller.space.active = key_state;
          controller.space.state = key_state;

      }
    }

  };

  player = {
    character: new Character(),
    jumping: true,
    height: 80,
    width: 80,
    x: 0,
    y: 40 - 18,
    x_velocity: 0,
    y_velocity: 0
  };

  bullets = [];


  sprite_sheet = {

    frame_sets: [
      [0, 1],
      [2, 3],
      [4, 5],
      [6],
      [8]
    ], // standing still, walk right, walk left
    image: new Image()
  };

  loop = function (time_stamp) {
    display.clearRect(0,0,display.canvas.width, display.canvas.height)

    if (controller.up.active && !player.jumping) {
      controller.up.active = false;
      player.jumping = true;
      player.y_velocity -= 5.5;
    }

    if (controller.left.active) {
      player.character.change(sprite_sheet.frame_sets[2], 15);
      player.x_velocity -= 0.5;

    }

    if (controller.right.active) {
      player.character.change(sprite_sheet.frame_sets[1], 15);
      player.x_velocity += 0.10;

    }

    if (!controller.left.active && !controller.right.active) {
      player.character.change(sprite_sheet.frame_sets[0], 20);
    }

    if (controller.space.active) {
      player.character.change(sprite_sheet.frame_sets[4], 15);
      var bullet = new Bullet(player.x,player.y,display);
      bullets.push(bullet);
    }



    player.y_velocity += 0.25;

    player.x += player.x_velocity;
    player.y += player.y_velocity;
    player.x_velocity *= 0.9;
    player.y_velocity *= 0.9;

    //Player position on the screen with respect to the edges
    if (player.y + player.height > display.canvas.height - 60) {
      player.jumping = false;
      player.y = display.canvas.height - 60 - player.height;
      player.y_velocity = 0;
    }

    if (player.x + player.width < 0) {
      player.x = display.canvas.width;
    } else if (player.x > display.canvas.width) {
      player.x = -player.width;

    }

    player.character.update();

    render();
    for(i=0; i < bullets.length; i++) {
      bullets[i].draw();
    }

    window.requestAnimationFrame(loop);

  };

  render = function () {
    display.drawImage(sprite_sheet.image, player.character.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE,
      player.x, player.y, player.width, player.height);
  };

  display.canvas.width = 800;
  display.canvas.height = 395;

  window.addEventListener("keydown", controller.keyUpDown);
  window.addEventListener("keyup", controller.keyUpDown);

  sprite_sheet.image.addEventListener("load", function (event) {
    window.requestAnimationFrame(loop);
  });

  sprite_sheet.image.src = "../images/character_move.png";

})();
(function () {

  function Background() {
    this.x = 0;
    this.y = 0;
    this.images = null;

    loadImages(sources, (images) => {
      this.images = images;
    })

    this.draw = () => {
      ctx.drawImage(this.images.background, this.x, this.y);
    }

    this.update = () => {
      this.x--;
      this.draw();
    }

  }

  var sprite_sheet = {

    frame_sets: [
      [0, 1],
      [2, 3],
      [4, 5],
      [6],
      [8]
    ], // standing still, walk right, walk left, jump, fire
    image: new Image()
  };

  var controller = {
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

  loop = function (time_stamp) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    if (controller.right.active) {
      background.update();
    } else {
      background.draw();
    }
    player.move(controller, sprite_sheet, cvs);

    window.requestAnimationFrame(loop);

  };

  window.addEventListener("keydown", controller.keyUpDown);
  window.addEventListener("keyup", controller.keyUpDown);
  let player;
  let background;

  function Game() {

    this.init = () => {
      background = new Background();
      player = new Character();

      sprite_sheet.image.addEventListener("load", function (event) {
        loop();
      });

      sprite_sheet.image.src = "../images/character_move.png";
    };
  };

  var game = new Game()
  game.init();

})();
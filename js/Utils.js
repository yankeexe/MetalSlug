var cvs = document.getElementById('ctx');
var ctx = cvs.getContext('2d');

// var shootTimer = 0;
var enemyGenerateTimer = 0;
var direction = true;
var enemyList = [];


sprite_sheet = {
  frame_sets: [
    [0, 1],
    [2, 3],
    [4, 5],
    [6],
    [8]
  ],
  image: new Image(),
  enemyImage: new Image()
}

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
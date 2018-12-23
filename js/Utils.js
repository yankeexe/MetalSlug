var cvs = document.getElementById('ctx');
var ctx = cvs.getContext('2d');

// var shootTimer = 0;
var enemyGenerateTimer = 0;
var direction = true;
var enemyList = [];
var truckList = [];
var kill = 0;
var life = 3;
var enemy;
var truck;
var anime;
var bgMusic;
var gameStart = false;
var counter = 0;
var healthCounter = 0;
var health = null;
var weapon = null;
var weaponCounter = 0;


sprite_sheet = {
  frame_sets: [
    [0, 1],
    [2, 3],
    [4, 5],
    [6],
    [8],
    [9, 10, 11],
  ],
  image: new Image(),
  heart: new Image(),
  startScreen: new Image(),
  explosion: new Image(),
  weaponUpdate: new Image(),
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

var IMAGE = {
  BACKGROUND: 0,
  BULLET: 1,
  ENEMY: 2,
  EXPLOSION: 3,
  HEALTH: 4,
  KHATRA: 5,
  ROCKET_UP: 6,
  START_SCREEN: 7
}
var IMAGE_SRC = [
  './images/background.png', './images/bullet.png', './images/char-enemy.png', './images/explosion.png', './images/health.png', './images/khatra.png', './images/rocket-up.png', './images/Start-Screen.png'

];
let images = [];
let imagesLength = 0;
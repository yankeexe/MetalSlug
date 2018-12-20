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

  loop = function (time_stamp) {
    var enemy;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    enemyGenerateTimer++;
    // shootTimer++;

    if (controller.right.active) {
      background.update();
    } else {
      background.draw();
    };

    player.move(controller, sprite_sheet, cvs);

    if (enemyGenerateTimer == 200 && enemyList.length < 5) {
      enemy = new Enemy(sprite_sheet.frame_sets, 15);

      enemyList.push(enemy);
      enemyGenerateTimer = 0;
    }


    for (var i = 0; i < enemyList.length; i++) {
      enemyList[i].move(player.x, player.y);
    }

    // if (shootTimer == 200) {
    //   for (var i = 0; i < enemyList.length; i++) {
    //     enemyList[i].shoot(sprite_sheet);
    //   }
    //   shootTimer = 0;
    // };




    window.requestAnimationFrame(loop);
  };


  window.addEventListener("keydown", controller.keyUpDown);
  window.addEventListener("keyup", controller.keyUpDown);

  let player;
  let background;
  let enemy;

  function Game() {

    this.init = () => {
      background = new Background();
      player = new Character();
      // enemy = new Enemy();

      sprite_sheet.image.addEventListener("load", function (event) {
        loop();
      });

      sprite_sheet.image.src = "../images/character_move.png";
      sprite_sheet.enemyImage.src = "../images/character_move.png";
    };
  };

  var game = new Game();
  game.init();

})();
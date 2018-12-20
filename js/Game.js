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

    //Collision
    for (var i = 0; i < player.bullets.length; i++) {
      for (var j = 0; j < enemyList.length; j++) {
        if (
          player.bullets[i].sXPos + player.bullets[i].width >= enemyList[j].x &&
          player.bullets[i].sXPos <= enemyList[j].x + enemyList[j].width &&
          (player.bullets[i].sYPos <= enemyList[j].y + enemyList[j].height ||
            player.bullets[i].sYPos + player.bullets[i].height >= enemyList[j].height)
        ) {
          console.log('hit');
          enemyList.splice(j, 1);
          player.bullets.splice(i, 1);
        }
      }
    }

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

      sprite_sheet.image.addEventListener("load", function (event) {
        var bgMusic = new Audio('../sounds/BGM2.wav');
        bgMusic.play();
        loop();
      });

      sprite_sheet.image.src = "../images/character_move.png";
      sprite_sheet.enemyImage.src = "../images/character_move.png";
    };
  };

  var game = new Game();
  game.init();

})();
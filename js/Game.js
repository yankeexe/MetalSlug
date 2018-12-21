(function () {

  function Background() {
    this.x = 0;
    this.y = 0;
    this.images = null;

    this.draw = () => {
      ctx.drawImage(this.images.background, this.x, this.y);
    }

    this.update = () => {
      this.x--;
      this.draw();
    }

  }

  loop = function (time_stamp) {
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

    //Collision Enemy
    for (var i = 0; i < player.bullets.length; i++) {
      for (var j = 0; j < enemyList.length; j++) {
        if (
          player.bullets[i].sXPos + player.bullets[i].width >= enemyList[j].x &&
          player.bullets[i].sXPos <= enemyList[j].x + enemyList[j].width &&
          (player.bullets[i].sYPos <= enemyList[j].y + enemyList[j].height ||
            player.bullets[i].sYPos + player.bullets[i].height >= enemyList[j].height)
        ) {
          enemyList.splice(j, 1);
          player.bullets.splice(i, 1);
          kill++;
        }
      }
    }

    //Collision Player
    for (var j = 0; j < enemyList.length; j++) {
      for (var i = 0; i < enemyList[j].bullets.length; i++) {
        if (
          enemyList[j].bullets[i].sXPos <= player.x + player.width &&
          enemyList[j].bullets[i].sXPos >= player.x &&
          enemyList[j].bullets[i].sYPos >= player.y &&
          enemyList[j].bullets[i].sYPos + enemyList[j].bullets[i].height <= player.y + player.height
        ) {
          enemyList[j].bullets.splice(i, 1);
          life--;
        }
      }
    }

    if (life == 0) {
      bgMusic.pause();
      var death = new Audio('../sounds/Death.wav');
      death.play();

      ctx.font = "50px Press Start";
      ctx.fillStyle = "white";
      ctx.fillText('Game Over', 200, 200);

      ctx.font = "20px Press Start";
      ctx.fillStyle = "white";
      console.log(kill);
      ctx.fillText(`Kills: ${kill}`, 300, 250);
      cancelAnimationFrame(anime);
      return;
    }


    ctx.font = "10px Press Start";
    ctx.fillStyle = "white";
    // ctx.drawImage(this.images.heart, 100, 30)
    ctx.fillText(`Kill: ${kill}`, 20, 30);
    ctx.fillText(`Life: ${life}`, 150, 30);

    anime = requestAnimationFrame(loop);
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
        loadImages(sources, (images) => {
          console.log(images)
          background.images = images;
          loop();
        })
        bgMusic = new Audio('../sounds/BGM2.wav');
        bgMusic.play();
      });

      sprite_sheet.image.src = "../images/character_move.png";
      sprite_sheet.enemyImage.src = "../images/character_move.png";
    };
  };

  var game = new Game();
  game.init();

})();
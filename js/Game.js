(function () {
  function Background() {
    this.x = 0;
    this.y = 0;
    this.images = null;

    this.draw = () => {
      ctx.drawImage(this.images.background, this.x, this.y);
    };

    this.update = () => {
      this.x--;
      this.draw();
    };

  }

  loop = function (time_stamp) {
    counter++;

    if (counter >= 2) {
      healthCounter++;
      weaponCounter++;
      counter = 0;
      enemyGenerateTimer++;
      ctx.clearRect(0, 0, cvs.width, cvs.height);

      if (controller.right.active) {
        if (weapon) {
          weapon.x--;
        }

        if (health) {
          health.x--;
        }

        background.update();
      } else {
        background.draw();
      }

      if (healthCounter == 500) {
        healthCounter = 0;
        health = new Life();
      }

      if (weaponCounter == 500) {
        weaponCounter = 0;
        weapon = new GunUpdate();
      }

      if (weapon) {
        weapon.draw();
        if (player.x + player.width >= weapon.x &&
          player.x + player.width <= weapon.x + weapon.width) {
          weapon = null;
          player.khatraWeapon = true;
        }
      }

      if (health) {
        health.draw();
        if (player.x + player.width >= health.x &&
          player.x + player.width <= health.x + health.width) {
          life += 1;
          health = null;
        }
      }
      player.move(controller, sprite_sheet, cvs);

      if (enemyGenerateTimer == 200 && enemyList.length < 5) {
        enemy = new Enemy(sprite_sheet.frame_sets, 15);
        enemyList.push(enemy);
        enemyGenerateTimer = 0;
      }

      if (enemyGenerateTimer == 700 && truckList.length < 2) {
        truck = new Truck();
        truckList.push(truck);
        enemyGenerateTimer = 0;
      }

      for (var i = 0; i < enemyList.length; i++) {
        enemyList[i].move(player.x, player.y);
      }

      //Collision Enemy
      let tempPlayerBullets = player.bullets;
      let tempEnemyList = enemyList;
      for (var i = 0; i < tempPlayerBullets.length; i++) {
        for (var j = 0; j < tempEnemyList.length; j++) {
          if (
            tempPlayerBullets[i].sXPos + tempPlayerBullets[i].width >= tempEnemyList[j].x &&
            tempPlayerBullets[i].sXPos <= tempEnemyList[j].x + tempEnemyList[j].width &&
            (tempPlayerBullets[i].sYPos <= tempEnemyList[j].y + tempEnemyList[j].height ||
              tempPlayerBullets[i].sYPos + tempPlayerBullets[i].height >= tempEnemyList[j].height)
          ) {
            ctx.drawImage(sprite_sheet.explosion, 0, 0, 47, 61, tempEnemyList[j].x, tempEnemyList[j].y, 47, 61);
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
        var death = new Audio("../sounds/Death.wav");
        death.play();

        ctx.font = "50px Press Start";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", 200, 200);

        ctx.font = "20px Press Start";
        ctx.fillStyle = "white";
        ctx.fillText(`Kills: ${kill}`, 300, 250);
        cancelAnimationFrame(anime);
        return;
      }

      ctx.font = "10px Press Start";
      ctx.fillStyle = "white";
      // ctx.drawImage(this.images.heart, 100, 30)
      ctx.fillText(`Kill: ${kill}`, 20, 30);
      ctx.fillText(`Life: ${life}`, 150, 30);

    }

    anime = requestAnimationFrame(loop);
  };

  window.addEventListener("keydown", controller.keyUpDown);
  window.addEventListener("keyup", controller.keyUpDown);
  window.addEventListener("keydown", startGame);

  function startGame(e) {
    if (e.keyCode == 13) {
      gameStart = true;
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      window.removeEventListener("keydown", startGame);
      game.init();
    }
  }

  let player;
  let background;
  let enemy;

  function Game() {
    this.init = () => {
      background = new Background();
      player = new Character();

      sprite_sheet.image.addEventListener("load", function (event) {
        loadImages(sources, images => {
          background.images = images;
          if (gameStart == false) {
            ctx.drawImage(sprite_sheet.startScreen, 0, 0, 798, 601, 0, 0, 800, 395);
          }
          if (gameStart == true) {
            loop();
          }
        });

        bgMusic = new Audio("../sounds/BGM2.wav");
        bgMusic.volume = 0.2;
        bgMusic.play();
      });

      sprite_sheet.image.src = "../images/char-enemy.png";
      sprite_sheet.image.src = "../images/char-enemy.png";
      sprite_sheet.heart.src = "../images/health.png";
      sprite_sheet.startScreen.src = "../images/Start-Screen.png";
      sprite_sheet.explosion.src = "../images/explosion.png";
      sprite_sheet.weaponUpdate.src = "../images/rocket-up.png";
    };
  }

  var game = new Game();
  game.init();
})();
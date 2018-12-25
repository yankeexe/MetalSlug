(function () {
  function Background() {
    this.x = 0;
    this.y = 0;
    this.images = null;

    this.draw = () => {
      ctx.drawImage(images[IMAGE.BACKGROUND], this.x, this.y);
    };

    this.update = () => {
      this.x--;
      this.draw();
    };
  }

  loop = function (time_stamp) {
    counter++;

    if (counter >= 1) {
      healthCounter++;
      weaponCounter++;
      truckGenerateTimer++;
      counter = 0;
      enemyGenerateTimer++;
      ctx.clearRect(0, 0, cvs.width, cvs.height);

      if (controller.right.active) {
        background.update();

        if (weapon) {
          weapon.x--;
        }

        if (health) {
          health.x--;
        }

      } else {
        background.draw();
      }

      if (healthCounter == 500 && life < 5) {
        healthCounter = 0;
        health = new Life();
      }

      if (weaponCounter >= 500 && !player.khatraWeapon) {
        weaponCounter = 0;
        weapon = new GunUpdate();
      }

      /* Get New Weapon */
      if (weapon) {
        weapon.draw();
        if (player.x + player.width >= weapon.x && player.x + player.width <= weapon.x + weapon.width) {
          var sound = new Audio('../sounds/powerup.wav');
          sound.play();
          weapon = null;
          player.khatraWeapon = true;
        }
      }

      /* Upgrade Health */
      if (health) {
        health.draw();
        if (player.x + player.width >= health.x && player.x + player.width <= health.x + health.width) {
          var sound = new Audio('./sounds/health-up.wav');
          sound.play();
          life += 1;
          health = null;
        }
      }
      player.move(controller, sprite_sheet, cvs);

      /* Generate New Enemy */
      if (enemyGenerateTimer == 200 && enemyList.length < 8) {
        enemy = new Enemy(sprite_sheet.frame_sets, 15);
        enemyList.push(enemy);
        enemyGenerateTimer = 0;
      }

      for (var i = 0; i < enemyList.length; i++) {
        enemyList[i].move(player.x, player.y);
      }

      /* Generate New Truck */
      if (truckGenerateTimer == 800 && truckList.length < 2) {
        truck = new Truck(sprite_sheet.frame_sets, 15);
        truckList.push(truck);
        truckGenerateTimer = 0;
      }

      for (var i = 0; i < truckList.length; i++) {
        truckList[i].move(player.x, player.y);
      }

      /*Collision Enemy*/
      let tempPlayerBullets = [...player.bullets];
      let tempEnemyList = [...enemyList];
      for (var i = 0; i < tempPlayerBullets.length; i++) {
        for (var j = 0; j < tempEnemyList.length; j++) {
          if (
            tempPlayerBullets[i].sXPos + tempPlayerBullets[i].width >= tempEnemyList[j].x &&
            tempPlayerBullets[i].sXPos <= tempEnemyList[j].x + tempEnemyList[j].width &&
            (tempPlayerBullets[i].sYPos <= tempEnemyList[j].y + tempEnemyList[j].height ||
              tempPlayerBullets[i].sYPos + tempPlayerBullets[i].height >= tempEnemyList[j].height)
          ) {
            var sound = new Audio("/sounds/Explosion.wav");
            sound.play();

            tempEnemyList[j].eLife--;
            player.bullets.splice(i, 1);

            if (tempEnemyList[j].eLife == 0) {
              var exp = new Explosion(sprite_sheet.frame_sets, 15, tempEnemyList[j].x, tempEnemyList[j].y);
              exp.draw(ctx, sprite_sheet);
              // ctx.drawImage(images[IMAGE.EXPLOSION], 0, 0, 47, 61, tempEnemyList[j].x, tempEnemyList[j].y, 47, 61);
              enemyList.splice(j, 1);
              kill++;
            }
          }
        }
      }

      /* Collision Truck */
      for (var i = 0; i < player.bullets.length; i++) {
        for (var j = 0; j < truckList.length; j++) {
          if (
            player.bullets[i].sXPos + player.bullets[i].width >= truckList[j].x &&
            player.bullets[i].sXPos <= truckList[j].x + truckList[j].width &&
            (player.bullets[i].sYPos <= truckList[j].y + truckList[j].height ||
              player.bullets[i].sYPos + player.bullets[i].height >= truckList[j].height)
          ) {
            var sound = new Audio("/sounds/Explosion.wav");
            sound.play();

            var exp = new Explosion(sprite_sheet.frame_sets, 15, truckList[j].x, truckList[j].y);
            exp.draw(ctx, sprite_sheet);
            // ctx.drawImage(images[IMAGE.EXPLOSION], 0, 0, 47, 61, tempEnemyList[j].x, tempEnemyList[j].y, 47, 61);
            truckList.splice(j, 1);
            player.bullets.splice(i, 1);
            kill++;

          }
        }
      }

      /*Collision Player*/
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

      /* Game Over */
      if (life == 0) {
        bgMusic.pause();
        var death = new Audio("./sounds/Death.wav");
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

      /* Level Complete */
      if (background.x == levelEnd) {
        ctx.font = "40px Press Start";
        ctx.fillStyle = "white";
        ctx.fillText("Level Complete", 100, 200);
        cancelAnimationFrame(anime);
        return;
      }

      ctx.font = "10px Press Start";
      ctx.fillStyle = "white";
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
      game.start();
    }
  }


  function Game() {
    this.load = () => {
      imagesLength++;
      if (imagesLength >= IMAGE_SRC.length) {
        game.start();
      }
    };
    this.init = () => {
      background = new Background();
      player = new Character();

      for (let i = 0; i < IMAGE_SRC.length; i++) {
        let img = new Image();
        img.src = IMAGE_SRC[i];
        img.onload = this.load;
        images.push(img);
      }
    };

    this.start = () => {
      if (gameStart == false) {
        ctx.drawImage(images[IMAGE.START_SCREEN], 0, 0, 798, 601, 0, 0, 800, 395);
        ctx.font = "20px Press Start";
        ctx.fillStyle = "white";
        ctx.fillText("Hit Enter", 310, 270);
      }
      if (gameStart == true) {
        bgMusic = new Audio("./sounds/BGM2.wav");
        bgMusic.volume = 0.5;
        bgMusic.play();
        loop();
      }
    };
  }

  var game = new Game();
  game.init();
})();
(function () {
  var cvs = document.getElementById('ctx');
  var ctx = cvs.getContext('2d');

  var canvas = document.getElementById('ctz');
  var ctz = canvas.getContext('2d');

  function background() {
    var background = new Image();
    background.src = "../images/background.png";

    background.onload = function () {
      ctx.drawImage(background, 0, 0);
    }
  }

  function Character() {
    this.srcW = 50;
    this.srcH = 50;
    this.destW = 120;
    this.destH = 120;
    this.destX = 0;
    this.destY = 280;
    this.counter = 0;
    var that = this;
    // this.frame = Math.floor(this.counter % 13);
    let request;

    this.init = () => {
      this.character = new Image();
      // this.character.src = "../images/move-left.png";
      animate();
    }

    let animate = () => {
      request = window.requestAnimationFrame(animate);
      draw();
    }

    let draw = () => {
      this.frame = Math.floor(that.counter % 13);
      loadImages(sources, function (images) {
        ctz.drawImage(images.character, that.frame * that.srcW, 0, that.srcW, that.srcH,
          that.destX, that.destY, that.destW, that.destH);
        that.counter += .25;
        // ctz.clearRect(that.counter / .25, y, that.width, that.height)
      })
    }
  }

  function Game() {

    this.init = function () {
      background();

      this.character = new Character();
      this.character.init();
    };
  };

  var game = new Game()
  game.init();

})();
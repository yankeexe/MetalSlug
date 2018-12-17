(function () {
    var cvs = document.getElementById('ctx');
    var ctx = cvs.getContext('2d');

    function Background() {
      this.x = 0;
      this.y = 0;
      loadImages(sources,  (images) => {
        ctx.drawImage(images.background, this.x, this.y);
      })
    }

  function Game() {

    this.init = ()=> {
      this.background = new Background();
    };
  };

  var game = new Game()
  game.init();

})();
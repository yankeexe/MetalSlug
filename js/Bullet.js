function Bullet(x,y,display) {
  var sXPos = x + 70;
  var sYPos = y + 34;

  this.display = display; 
  this.shoot = new Image();
  this.shoot.src = '../images/bullet.png';

  this.draw = function () {
    // this.display.beginPath();
    this.display.drawImage(this.shoot,sXPos, sYPos)
    this.update();
  }

  this.update = function () {
    sXPos += 10;
  }
}
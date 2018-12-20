function Bullet(x, y, display, isRightDirection) {
  this.sXPos = x + 70;
  this.sYPos = y + 34;
  this.width = 14;
  this.height = 8;

  this.isRightDirection = isRightDirection;
  this.display = display;
  this.shoot = new Image();
  this.shoot.src = '../images/bullet.png';

  this.draw = function () {
    this.display.drawImage(this.shoot, this.sXPos, this.sYPos, this.width, this.height);
    this.update();
  }

  this.update = function () {

    if (isRightDirection) {
      this.sXPos += 10;
    } else {
      this.sXPos -= 10;
    }
  }

}
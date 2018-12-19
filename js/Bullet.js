function Bullet(x,y,display,isRightDirection) {
  var sXPos = x + 70;
  var sYPos = y + 34;

  this.isRightDirection=isRightDirection;
  this.display = display; 
  this.shoot = new Image();
  this.shoot.src = '../images/bullet.png';

  this.draw = function () {
    // this.display.beginPath();
    this.display.drawImage(this.shoot,sXPos, sYPos)
    this.update();
  }

  this.update = function () {

    if(isRightDirection) {
      sXPos += 10;
    } 
    else{
      sXPos-=10;
    } 
  }

}
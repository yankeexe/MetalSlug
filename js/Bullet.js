function Bullet(x, y, display, isRightDirection, khatraBullet) {
  this.sXPos = x + 70;
  this.sYPos = y + 34;
  this.width = 14;
  this.height = 8;

  this.khatraBullet = khatraBullet;

  this.isRightDirection = isRightDirection;
  this.display = display;
  this.shootSimple = new Image();
  this.shootSimple.src = './images/bullet.png';
  this.shootKhatra = new Image();
  this.shootKhatra.src = './images/khatra.png';

  this.draw = function () {
    let bullet = null;
    if (khatraBullet) {
      bullet = images[IMAGE.KHATRA];
    } else {
      bullet = images[IMAGE.BULLET];
    }
    this.display.drawImage(bullet, this.sXPos, this.sYPos, this.width, this.height);
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
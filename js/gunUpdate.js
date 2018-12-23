function GunUpdate() {
  this.x = Math.random() * 350 + 50;
  this.y = 280;
  this.width = 12;
  this.height = 33;

  this.draw = function () {
    ctx.drawImage(images[IMAGE.ROCKET_UP], 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}
function Life() {
  this.height = 20;
  this.width = 20;
  this.x = Math.random() * 350 + 50;
  this.y = 280;

  this.draw = () => {
    ctx.drawImage(images[IMAGE.HEALTH], 0, 0, 178, 178, this.x, this.y, this.width, this.height);
  }



}
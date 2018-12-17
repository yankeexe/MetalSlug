function Enemy() {
  this.x;
  this.y; 
  this.width; 
  this.heigth; 

  this.draw(){
    ctx.drawImage(sprite_sheet.image, that.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE,
      that.x, that.y, SPRITE_DEST_SIZE, SPRITE_DEST_SIZE);
  }

  this.update() {

  }
}
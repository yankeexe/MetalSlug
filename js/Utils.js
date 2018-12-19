var cvs = document.getElementById('ctx');
var ctx = cvs.getContext('2d');

var shootTimer = 0;
var direction = true;


sprite_sheet = {
  frame_sets: [
    [0, 1],
    [2, 3],
    [4, 5],
    [6],
    [8]
  ],
  image: new Image()
}

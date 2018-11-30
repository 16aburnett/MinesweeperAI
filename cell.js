// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

function Cell(i, j, w , xOff, yOff) {
  // cell index
  this.i = i;
  this.j = j;

  // location of cell (relative to location of grid)
  this.x = i * w + xOff;
  this.y = j * w + yOff;

  this.w = w;
  this.neighboringBees = 0;

  this.bee = false;
  this.revealed = false;
  this.flagged = false; 
}

Cell.prototype.show = function() {
  stroke(255);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.bee) {
      fill(200, 0, 0);
      rect(this.x, this.y, this.w, this.w);
      fill(255, 255, 0);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    } else {

        // if (this.neighborCount == 0){
        //     fill(127);
        // } else if (this.neighborCount == 1){
        //     fill(0, 100, 200);
        // } else if (this.neighborCount == 2){
        //     fill(0, 200, 200);
        // } else if (this.neighborCount == 3){
        //     fill(0, 200, 100);
        // } else if (this.neighborCount == 4){
        //     fill(0, 200, 0);
        // } else if (this.neighborCount == 5){
        //     fill(100, 200, 0);
        // } else if (this.neighborCount == 6){
        //     fill(200, 200, 0);
        // } else if (this.neighborCount == 7){
        //     fill(200, 100, 0);
        // } else if (this.neighborCount == 8){
        //     fill(200, 0, 0);
        // }
        fill(200);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighboringBees > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighboringBees, this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  } else if (this.flagged){
    fill(200);
    rect(this.x, this.y, this.w, this.w);
    textAlign(CENTER);
    noStroke();
    fill(200, 0, 0);
    text('X', this.x + this.w * 0.5, this.y + this.w - 6);
  }
}

Cell.prototype.countBees = function() {
  if (this.bee) {
    this.neighboringBees = -1;
    return;
  }
  var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid.grid[i][j];
      if (neighbor.bee) {
        total++;
      }
    }
  }
  this.neighboringBees = total;
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
  this.revealed = true;
  if (this.neighboringBees == 0) {
    // flood fill time
    this.floodFill();
  }
}

Cell.prototype.flag = function(){

  // toggle flagged
  this.flagged = this.flagged != true;

}

Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid.grid[i][j];
      // Note the neighbor.bee check was not required.
      // See issue #184
      if (!neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
}
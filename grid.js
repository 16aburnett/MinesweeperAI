function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  

function Grid(cols, rows, w, totalBees, x, y){

    this.grid;
    this.cols = cols;
    this.rows = rows;
    this.w = w;
    this.totalBees = totalBees;
    
    // location of the grid
    this.x = x;
    this.y = y;
    
    this.reset();
}

Grid.prototype.reset = function(){

    this.grid = make2DArray(this.cols, this.rows);
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.grid[i][j] = new Cell(i, j, w, this.x, this.y);
      }
    }

}

Grid.prototype.pickBees = function(){

  // Pick totalBees spots
  var options = [];
  for (var i = 0; i < this.cols; i++) {
    for (var j = 0; j < this.rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < this.totalBees; n++) {
      var index = floor(random(options.length));
      var choice = options[index];
      var i = choice[0];
      var j = choice[1];
      // Deletes that spot so it's no longer an option
      options.splice(index, 1);
      this.grid[i][j].bee = true;
    }

    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.grid[i][j].countBees();
      }
  }

}

Grid.prototype.setAllRevealed = function(){
    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          this.grid[i][j].revealed = true;
        }
      }
}

Grid.prototype.reveal = function(x, y){

    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          if (this.grid[i][j].contains(x, y)) {
            this.grid[i][j].reveal();
    
            if (this.grid[i][j].bee) {
              return -1;
            }
            
            return 0;
          }
        }
      }


}

Grid.prototype.revealCell = function(i, j){
    this.grid[i][j].reveal();
    
    if (this.grid[i][j].bee) {
        return -1;
    }
    
    return 0;
}

Grid.prototype.show = function(){
    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          this.grid[i][j].show();
        }
      }
}
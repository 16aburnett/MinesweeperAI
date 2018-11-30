
function Bot(){
   this.revealedCells = []; 
    this.unrevealedCells = [];

}

Bot.prototype.play = function(){

    return this.clickCell();

}

Bot.prototype.clickCell = function(){
    // Stage 1 : flag all locations that are 100% bombs
    this.getRevealedCells();
    this.getUnrevealedCells();

    for (var i = 0; i < this.revealedCells.length; i++){
        //console.log(this.revealedCells[i]);

        var numBees = this.revealedCells[i].neighboringBees;
        //console.log(numBees);

        var numNeighbors = 0;
        var neighbors = [];

        var cellX = this.revealedCells[i].i;
        var cellY = this.revealedCells[i].j;
        for (var j = cellX - 1; j <= cellX + 1; j++){
            for (var k = cellY - 1; k <= cellY + 1; k++){
                
                if(j >= 0 && j < grid.grid.length 
                    && k >= 0 && k < grid.grid.length
                    && !grid.grid[j][k].revealed) {
                    numNeighbors++;
                    neighbors.push(grid.grid[j][k]);
                }
            }
        }

        //console.log(numNeighbors);

        // simple case : num neighbors == num neighboring bees

        if(numBees == numNeighbors){

            var flaggged = false;
            // flag all neighbors cos dey bees (100% certain)
            for(var j = 0; j < neighbors.length; j++){

                //as long as it isnt already flagged
                if(!neighbors[j].flagged){
                    grid.flagCell(neighbors[j]);
                    flaggged = true;
                    console.log("flagging cell " + neighbors[j]);
                    return 0;
                }

            }

        }

    }


    // Stage 2 : pick a spot that cannot be a bomb (if there is one)
    for (var i = 0; i < this.revealedCells.length; i++){
        //console.log(this.revealedCells[i]);

        var numBees = this.revealedCells[i].neighboringBees;
        //console.log(numBees);

        var numNeighbors = 0;
        var neighbors = [];

        var cellX = this.revealedCells[i].i;
        var cellY = this.revealedCells[i].j;
        for (var j = cellX - 1; j <= cellX + 1; j++){
            for (var k = cellY - 1; k <= cellY + 1; k++){
                
                if(j >= 0 && j < grid.grid.length 
                    && k >= 0 && k < grid.grid.length
                    && !grid.grid[j][k].revealed) {
                    numNeighbors++;
                    neighbors.push(grid.grid[j][k]);
                }
            }
        }

        var flaggged = 0;

        // test if all neighboring bombs where found -> click all rest
        for (var j = 0; j < neighbors.length; j++){
            if (neighbors[j].flagged){
                flaggged++;
            }
        }

        if (flaggged == numBees){

            // click the rest
            for (var j = 0; j < neighbors.length; j++){
                if (!neighbors[j].flagged){
                    grid.revealCell(neighbors[j].i, neighbors[j].j);
                    console.log(neighbors[j]);
                    return 0;
                }
            }

        }

    }


    // Stage 3 : if no spot exists, click a random cell and pray ;__;
    // console.log(this.unrevealedCells);
    // var randCell = this.unrevealedCells[random(this.unrevealedCells.length - 1)];
    // console.log(randCell);
    // return grid.revealCell(random(this.unrevealedCells.length - 1));
  
}

Bot.prototype.getUnrevealedCells = function(cell){

    this.unrevealedCells = grid.getUnrevealedCells();

}

Bot.prototype.getRevealedCells = function(){

    this.revealedCells = grid.getRevealedCells();

}
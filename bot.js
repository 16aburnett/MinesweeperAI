// Minesweeper AI
// Created By Anthony Burnett

function Bot(){

    this.revealedCells = []; 
    this.unrevealedCells = [];
    this.allowedToPlay = false;
    this.cursor = new Cursor();

    this.sprite = new Sprite();
    // sprite shows the current thought process of the bot 
    // green - it knows (unrevealed) cells that are 100% not bombs 
    // yellow - it knows (unrevealed) cells that are 100% bombs
    // red - it doesnt know any (unrevealed) cells that are bombs
    //     or cells with 100% certainty



    // bot.stats 
    // - how many flags
    // - how many random click phases
    // - time solved ?
    // 
    this.numRandomClick = 0;
}

Bot.prototype.reset = function(){

    this.revealedCells = []; 
    this.unrevealedCells = [];
    this.previousTime = 0;
    this.timeToSolve = 0;
    this.numRandomClick = 0;

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

        // simple case : num neighbors == num neighboring bees

        if(numBees == numNeighbors){
            this.sprite.mode = color(255,255,0);

            var flaggged = false;
            // flag all neighbors cos dey bees (100% certain)
            for(var j = 0; j < neighbors.length; j++){
                    
                //as long as it isnt already flagged
                if(!neighbors[j].flagged){
                    grid.flagCell(neighbors[j]);
                    flaggged = true;
                   this.cursor.cursorToCell(neighbors[j].x + (neighbors[j].w / 2), neighbors[j].y + (neighbors[j].w / 2));
                   return 0;
                }

            }

        }

    }


    // Stage 2 : pick a spot that cannot be a bomb (if there is one)
    for (var i = 0; i < this.revealedCells.length; i++){
        this.sprite.mode = color(0,255,0);

        var numBees = this.revealedCells[i].neighboringBees;
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
                  this.cursor.cursorToCell(neighbors[j].x + (neighbors[j].w / 2), neighbors[j].y + (neighbors[j].w / 2));
                  return grid.revealCell(neighbors[j].i, neighbors[j].j);
                }
            }

        }

    }

    // could add a new stage here to make an more better guess than just any open cell
    // some cells might have a higher chance of having a bomb 
    // (if there are more solutions for places of bombs
    //      where a given cell has a bomb versus not, then avoid it(dont flag))

    // Stage 3 : if no spot exists, click a random cell and pray ;__;
    if(this.unrevealedCells.length > 0){
        this.sprite.mode = color(255,0,0);
        var randCell = this.unrevealedCells[floor(random(this.unrevealedCells.length - 1))];
        this.cursor.cursorToCell(randCell.x + (randCell.w / 2), randCell.y + (randCell.w / 2));
        this.numRandomClick++;
        return grid.revealCell(randCell.i,randCell.j);
    }
  
}

Bot.prototype.getUnrevealedCells = function(cell){

    this.unrevealedCells = grid.getUnrevealedCells();

}

Bot.prototype.getRevealedCells = function(){

    this.revealedCells = grid.getRevealedCells();

}
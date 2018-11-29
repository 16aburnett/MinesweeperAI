
function Bot(){
   this.options; 


}

Bot.prototype.clickCell = function(){

    var col = floor(random(grid.grid.length));
    var row = floor(random(grid.grid[0].length));

    console.log(col + " " + row);

    return grid.revealCell(col, row);



    // picking algorithm

    // pick a random option 

    // eval each hidden neighbor to revealed, 

    //   if impossible for it to be bee 
    //      then click/reveal that specific cell

    //  if there is no 'safe' click, click randomly 
    // (that isnt adjacent to a revealed)

    // 

}
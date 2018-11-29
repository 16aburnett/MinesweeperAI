// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E


  var grid;
  var cols;
  var rows;
  var isGameOver;
  var bot;

  function setup() {
    createCanvas(401, 601);
    background(0);
    isGameOver = false;
    w = 20;
    cols = floor(width / w);
    rows = floor((height - 200) / w);

    grid = new Grid(cols, rows, w, 100, 0, 200);
    grid.pickBees();

    bot = new Bot();
  
  }
  
  function gameOver() {
    grid.setAllRevealed();
    isGameOver = true;
  }
  
  function mousePressed() {
    var check = grid.reveal(mouseX, mouseY);
    if(isGameOver){
        grid.reset();
        grid.pickBees();
        isGameOver = false;
    }
    else if(check == -1){
        gameOver();
    }
    
  }
  
  function keyPressed(){
    if(isGameOver){
        grid.reset();
        grid.pickBees();
        isGameOver = false;
    } else {
        var check = bot.clickCell();
        if(check == -1){
            gameOver();
        }
    }
  }

  function draw() {
    background(0);
    grid.show();
    if(isGameOver){
        textSize(32);
        fill(255,0,0);
        text('GAME OVER', width / 2, 100);
        fill(200);
        textSize(16);
        text('click or press any button to start over', width / 2, 125);
        textSize(12);
    } 
  }
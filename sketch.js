// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E
// 
// Adapted by Anthony Burnett


  var grid;
  var cols;
  var rows;
  var isGameOver;
  var gameWin;
  var bot;
  var flagMode;

  function setup() {
    createCanvas(401, 601);
    background(0);
    isGameOver = false;
    flagMode = false;
    gameWin = false;
    w = 20;
    cols = floor(width / w);
    rows = floor((height - 200) / w);

    grid = new Grid(cols, rows, w, 50, 0, 200);
    grid.pickBees();

    bot = new Bot();
  
  }

  function gameWon(){
    gameWon = true;
  }

  function gameOver() {
    grid.setAllRevealed();
    isGameOver = true;
  }
  
  function mousePressed() {
    if(flagMode){
      grid.flag(mouseX, mouseY);
    } else {
      var check = grid.reveal(mouseX, mouseY);
      if(isGameOver){
          grid.reset();
          grid.pickBees();
          isGameOver = false;
          gameWin = false;
      } else if(gameWin){
        grid.reset();
        grid.pickBees();
        isGameOver = false;
        gameWin = false;
    }
      else if(check == -1){
          gameOver();
      } else if (check == 1){
          gameWin = true;
      }
    }
  }
  
  function keyPressed(){
      if(isGameOver){
        grid.reset();
        grid.pickBees();
        isGameOver = false;
    } else if (key === 'F') {
      // toggle flagmode 
      flagMode = flagMode != true;
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
    headerText();
    var check = bot.play();
    if(isGameOver){
      gameOverText();
    } 
    if(gameWin){
      gameWinText();
    }
    if(flagMode){
      flaggedText();
    }
    if (check == -1){
      isGameOver = true;
    }
  }

  function headerText(){
    textAlign(LEFT);
    textSize(14);
    noStroke();
    fill(240);
    text('Mine Sweeper v2.0', 7, 14);
    textSize(10);
    text('Game Created by Daniel Shiffman', 7, 28);
    text('A.I. Created by Anthony Burnett', 7, 42);
    textSize(12);
  }

  function flaggedText(){

    textAlign(LEFT);
    textSize(14);
    noStroke();
    fill(240);
    text('FlagMode*', 7, 190);
    textSize(12);

  }

  function gameOverText(){
    textAlign(CENTER);
    textSize(32);
    fill(255,0,0);
    text('GAME OVER', width / 2, 100);
    fill(200);
    textSize(16);
    text('click or press any button to start over', width / 2, 125);
    textSize(12);
  }

  function gameWinText(){
    textAlign(CENTER);
    textSize(32);
    fill(0,255,0);
    text('WINNER!', width / 2, 100);
    fill(200);
    textSize(16);
    text('click or press any button to start over', width / 2, 125);
    textSize(12);
  }
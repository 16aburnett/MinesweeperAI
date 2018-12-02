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
  var isGameWon;
  var bot;
  var flagMode;
  var resetOnLoss;
  var bees;

  function setup() {
    // height should be padded by 100 for top info row
    createCanvas(401, 501);
    background(0);
    isGameOver = false;
    flagMode = false;
    isGameWon = false;
    resetOnLoss = false;

    // create the minesweeper grid
    w = 20;
    cols = floor(width / w);
    rows = floor((height - 100) / w);
    bees = 50;
    grid = new Grid(cols, rows, w, bees, 0, 100);
    grid.pickBees();

    // create bot to play minesweeper
    bot = new Bot();
  
  }

  function mousePressed() {
    if(flagMode){
      grid.flag(mouseX, mouseY);
    } else {
      var check = grid.revealXY(mouseX, mouseY);
      if(isGameOver || isGameWon){
          grid.reset();
          grid.pickBees();
          bot.reset();
          isGameOver = false;
          isGameWon = false;
      } else if(check == -1){
        grid.setAllRevealed();
        isGameOver = true;
      } else if (check == 1){
        isGameWon = true;
      }
    }
  }
  
  function keyPressed(){
      if(isGameOver || isGameWon){
        grid.reset();
        grid.pickBees();
        bot.reset();
        isGameOver = false;
        isGameWon = false;
    } else if (key === 'F') {
      // toggle flagmode 
      flagMode = flagMode != true;
    } else if (key === 'B') {
      // toggle bot  
      bot.allowedToPlay = bot.allowedToPlay != true;
    } else if (key === 'L') {
      // toggle reset on loss 
      resetOnLoss = resetOnLoss != true;
    } else { // pressing any random button will advance bot by one move
        var check = bot.clickCell();
        if(check == -1){
          grid.setAllRevealed();
          bot.reset();
          isGameOver = true;
        }
    }
  }

  function draw() {
    background(0);
    headerText();
    botRandClicksText();
    grid.show();
    bot.cursor.show();
    bot.sprite.show();
    if(!isGameOver && !isGameWon && bot.allowedToPlay){
      var check = bot.play();
    }
    if(isGameOver){
      gameOverText();
      // resets as soon as game is lost so bot can play til win
      if(resetOnLoss){
        grid.reset();
        grid.pickBees();
        bot.reset();
        isGameOver = false;
        isGameWon = false;
      }
    } 
    if (check == -1){
      grid.setAllRevealed();
      isGameOver = true;
    }
    if(check == 1){
      isGameWon = true;
    }
    if(isGameWon){
      gameWinText();
    }
    if(flagMode){
      flaggedText();
    }
    if(resetOnLoss){
      resetText();
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
    text('Press B and watch the magic happen', 7, 56);
    text('Press F for flagmode', 7, 70);
    text('Press L for autoReset on Loss', 7, 84);
    textSize(12);
  }

  function flaggedText(){

    textAlign(LEFT);
    textSize(10);
    noStroke();
    fill(240);
    text('FlagMode*', 7, 96);
    textSize(12);

  }

  
  function resetText(){

    textAlign(LEFT);
    textSize(10);
    noStroke();
    fill(240);
    text('ResetOnLoss*', 60, 96);
    textSize(12);

  }

  function botRandClicksText(){
    textAlign(RIGHT);
    textSize(14);
    noStroke();
    fill(240);
    text('Bot rand clicks = ' + bot.numRandomClick, width - 5, 90);
    textSize(12);
  }

  function gameOverText(){
    fill('rgba(0,0,0,0.5)');
    rect(grid.x, grid.y, grid.cols * grid.w, grid.rows * grid.w);
    textAlign(CENTER);
    textSize(32);

    //shadow
    fill('rgba(0,0,0,0.5)');
    text('GAME OVER', width / 2 + 2, grid.y + grid.rows * grid.w / 2 - (32 / 2) + 3);
    
    
    fill(255,0,0);
    text('GAME OVER', width / 2, grid.y + grid.rows * grid.w / 2 - (32 / 2));
    
    fill(200);
    textSize(16);
    text('click or press any button to start over', width / 2, grid.y + grid.rows * grid.w / 2);
    textSize(12);
  }

  function gameWinText(){
    
    fill('rgba(0,0,0,0.5)');
    rect(grid.x, grid.y, grid.cols * grid.w, grid.rows * grid.w);
    textAlign(CENTER);
    textSize(32);

    // shadow 
    fill('rgba(0,0,0,0.5)');
    text('WINNER!', width / 2 + 2, grid.y + grid.rows * grid.w / 2 - (32 / 2) + 3);
   

    fill(0,255,0);
    text('WINNER!', width / 2, grid.y + grid.rows * grid.w / 2 - (32 / 2));
   
    fill(200);
    textSize(16);
    text('click or press any button to start over', width / 2, grid.y + grid.rows * grid.w / 2);
    textSize(12);
  }
function Cursor(){

    this.x = width / 2;
    this.y = height / 2;

}

Cursor.prototype.cursorToCell = function(x,y){

    this.x = x;
    this.y = y;

}

Cursor.prototype.show = function(){

    var shift = 4;

    fill('rgba(0,0,0,0.25)');
    noStroke();
    beginShape();
    vertex(this.x + 0 + shift, this.y + 0);
    vertex(this.x + 0 + shift, this.y + 16);
    vertex(this.x + 4 + shift, this.y + 14);
    vertex(this.x + 6 + shift, this.y + 18);
    vertex(this.x + 10 + shift, this.y + 16);
    vertex(this.x + 8 + shift, this.y + 12);
    vertex(this.x + 12 + shift, this.y + 10);
    endShape(CLOSE);
    
    fill(255);
    stroke(0);
    beginShape();
    vertex(this.x + 0, this.y + 0);
    vertex(this.x + 0, this.y + 16);
    vertex(this.x + 4, this.y + 14);
    vertex(this.x + 6, this.y + 18);
    vertex(this.x + 10, this.y + 16);
    vertex(this.x + 8, this.y + 12);
    vertex(this.x + 12, this.y + 10);
    endShape(CLOSE);

}
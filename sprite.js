function Sprite(){

    this.x = width - 50;
    this.y = 10;
    this.mode = color(0, 255, 0);

}

Sprite.prototype.show = function (){

    fill(this.mode);
    rect(this.x, this.y, 40, 40);

}
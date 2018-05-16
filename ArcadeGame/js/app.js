
//Intialize Score with zero whwen the game begin
let score = 0;
//set the value of score to the html element with id score
document.getElementById('score').innerHTML = score;

let Enemy = function (x, y, speed) {

    // These variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Reappear enemies  when they are off the canvas randomly with different speeds
    if (this.x > 509) {
        this.x = -44;
        this.speed = 100 + Math.ceil(Math.random() * 222);
        //increase speed when score get bigger than 5
        if(score > 5 ){
          this.speed = 150 + Math.ceil( Math.random() * 222);
        }
        //increase speed when score get bigger than 10

        if(score > 10 ){
          this.speed = 200 + Math.ceil( Math.random() * 222);
        }
    };

    // Checks for collisions between the player and the enemies
    if ( this.x + 80 > player.x &&
        player.x + 80 > this.x &&
        this.y + 60 > player.y &&
         this.y <  player.y + 60 ) {
          //if there is a collisions reset the player to the starting position
        player.x = 202;
        player.y = 405;
        //reset the score to zero if there
        score = 0;
       document.getElementById('score').innerHTML = score;
    };
};

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class that take two parameters x and y
var Player = function (x, y) {

    // Variables for the player to move along x and y axis
    this.x = x;
    this.y = y;

    //The image of the player of horn-girl is added to the playing field
    this.catplayer = 'images/char-cat-girl.png';
};
//This function update the position of the player and score if he/she reach the water
Player.prototype.update = function (dt) {
  if(this.y < 7){
   score++;
   document.getElementById('score').innerHTML = score;
    this.x = 202;
    this.y = 405;



  }
};

// Renders the image of the player character into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.catplayer), this.x, this.y);
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (direction){

    // Enables user on click on  left arrow key to move left on the x axis by 102 and not go off the game tiles on the left side
    if (direction === 'left' && this.x > 0) {
        this.x -= 102;
    };

    // Enables user on click on right arrow key to move right on the x axis by 102 and not go off the game tiles on the right side

    if (direction ==='right' && this.x < 405) {
        this.x += 102;
    };

    // Enables user on  click on up arrow key to move upwards on the y axis by 83
    if (direction === 'up' && this.y > 0) {
        this.y -= 83;
    };

    // Enables user on click on down arrow key to move downwards on the y axis by 83 and not  go off the game tiles on the bottom side

    if (direction === 'down' && this.y < 405) {
        this.y += 83;
    };


};


// All enemies are placed in an array



var enemy1 = new Enemy(0, 63, 200);
var enemy2 = new Enemy(0, 147, 200);
var enemy3 = new Enemy(0, 230, 200);
var allEnemies = [enemy1,enemy2,enemy3];


// The starting location of the player is located at x=200, y=405
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

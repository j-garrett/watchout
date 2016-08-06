var enemyCount = 0;

var Enemy = function(id, color, size, target, currentLocation, duration) {
  this.id = 'enemy' + id.toString();
  this.color = color;
  this.class = 'enemy';
  // this.target = target;
  this.currentLocation = currentLocation;
  this.duration = duration;
  this.size = size;
};

Enemy.prototype.method = function() {

};

var Seeker = function(id) {
  var color = 'hsl(360, 100%, ' + (Math.random() * 33 + 33) + '%)';
  var start = [svgWidth + 50, svgHeight - 50];
  this.move = 0;
  Enemy.call(this, enemyCount, color, 10, undefined, start, 1000);
};

Seeker.prototype = Object.create(Enemy.prototype);
Seeker.prototype.constructor = 'seeker';
Seeker.prototype.target = function () { 
  this.move++;
  var destination = [];

  if (this.move % 5 === 0) {
    var node = d3.select('.board').select('.' + this.id);
    this.currentLocation = [node.attr('cx'), node.attr('cy')]; 
    destination.push(playerLocation[0] + 2 * (playerLocation[0] - this.currentLocation[0]));
    destination.push(playerLocation[1] + 2 * (playerLocation[1] - this.currentLocation[1]));
  } else if (this.move % 3 === 0) {
    destination = [Math.random() * svgWidth, Math.random() * svgHeight];
  } else {
    destination = [playerLocation[0], playerLocation[1]];  
  }

  return destination; 
};

var Asteroid = function(id) {
  var color = 'hsl(215, 100%, ' + (Math.random() * 20 + 25) + '%)';
  var start = [-100, Math.random() * svgHeight];
  this.destination = [svgWidth + 200, Math.random() * svgHeight];
  Enemy.call(this, enemyCount, color, 80, this.destination, start, 10000);
};

Asteroid.prototype = Object.create(Enemy.prototype);
Asteroid.prototype.constructor = 'asteroid';
Asteroid.prototype.target = function() {
  var node = d3.select('.board').select('.' + this.id);
  this.currentLocation = [node.attr('cx'), node.attr('cy')];
  if (this.currentLocation[0] > 1099) {
    enemies.splice(enemies.indexOf(this), 1);
  }
  return this.destination;
};







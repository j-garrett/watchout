// var generateAsteroid = function () {
//   var newAsteroid = {};
//   newAsteroid.number = asteroids.length + 1;
//   var temp = Math.floor(Math.random() * 16777216);
//   newAsteroid.color = '#' + temp.toString(16);
//   newAsteroid.size = Math.floor(Math.random() * 15 + 10);
//   return newAsteroid;
// };

var enemyCount = 0;

var Enemy = function(id, color, size, target, currentLocation, duration) {
  this.id = id;
  this.color = color;
  this.class = 'enemy';
  this.target = target;
  this.currentLocation = currentLocation;
  this.duration = duration;
  this.size = size;
};

Enemy.prototype.method = function() {

};

var Seeker = function(id) {
  var color = 'hsl(360, 100%, ' + (Math.random() * 33 + 33) + '%)';
  var start = [svgWidth + 50, svgHeight - 50];
  var target = function () { 
    var move = 0;
    if (move % 2 === 0) {
      return playerLocation; 
    }
    
  };
  Enemy.call(this, enemyCount, color, 10, target, start, 1000);
};

Seeker.prototype = Object.create(Enemy.prototype);
Seeker.prototype.constructor = 'Seeker';
Seeker.prototype.move = function() {
  // SEEEEEK
};

var Asteroid = function(id) {
  var color = 'hsl(215, 100%, ' + (Math.random() * 20 + 25) + '%)';
  var start = [-50, Math.random() * svgHeight - Math.random() * svgHeight];
  var target = [svgWidth + 50, Math.random() * svgHeight * 2];
  var getTarget = function () { return target; };
  Enemy.call(this, enemyCount, color, 50, getTarget, start, 5000);
};

Asteroid.prototype = Object.create(Enemy.prototype);
Asteroid.prototype.constructor = 'Asteroid';
Asteroid.prototype.move = function() {
  // FLOAT DIAGONALLY
};
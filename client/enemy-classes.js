var generateAsteroid = function () {
  var newAsteroid = {};
  newAsteroid.number = asteroids.length + 1;
  var temp = Math.floor(Math.random() * 16777216);
  newAsteroid.color = '#' + temp.toString(16);
  newAsteroid.size = Math.floor(Math.random() * 15 + 10);
  return newAsteroid;
};

var Enemy = function(id, color, size) {
  this.id = id;
  this.color = color;
  this.class = 'enemy';
};

Enemy.prototype.method = function() {

};

var Seeker = function(id) {
  var color = 'hsl(360, 100%, ' + (Math.random() * 33 + 33) + '%)';
  Enemy.call(this, id, color, 10);
};

Seeker.prototype = Object.create(Enemy.prototype);
Seeker.prototype.constructor = 'Seeker';
Seeker.prototype.move = function() {
  // SEEEEEK
};

var Asteroid = function(id) {
  var color = 'hsl(360, 100%, ' + (Math.random() * 20 + 25) + '%)';
  Enemy.call(this, id, color, 10);
};

Asteroid.prototype = Object.create(Enemy.prototype);
Asteroid.prototype.constructor = 'Asteroid';
Asteroid.prototype.move = function() {
  // FLOAT DIAGONALLY
};
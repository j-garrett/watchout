
//-------------------------------------------------------------------//
// Score and Whatnot                                                 //
//-------------------------------------------------------------------//
  var gameValues = {
    'high score': 0,
    'current score': 0,
    'collisions': 0
  };

  var scoreData = [0, 0, 0];

  

  var scoreUpdater = function () {
    var score = d3.select('.scoreboard').selectAll('span');
    score
      .data(scoreData)
      .text(function (d) {
        return Math.floor(d);
      });
  };


//-------------------------------------------------------------------//

//-------------------------------------------------------------------//
// Button Functions                                                  //
//-------------------------------------------------------------------//
  var gameStart = function () {
    enemies.push(new Seeker);
    updateBoard(enemies);

    window.gameOn = setInterval(function () {
      updateBoard(enemies);
    }, 500);

    window.tickDifficulty = setInterval(function () {
      if (enemies.length >= 15) {
        enemies.forEach(function(x) {
          if (x.size < 50) {
            x.size++;          
          }
          return;
        });
      } else {
        enemies.push(generateEnemy());
      }
    }, Math.random() * 5000 + 2000);

    window.updateScore = setInterval(scoreUpdater, 10);

    window.checkForDeath = setInterval(deathCheck, 10);
  };
  

//-------------------------------------------------------------------//



//-------------------------------------------------------------------//
// Board Handler                                                     //
//-------------------------------------------------------------------//
  var svg = d3.select('.board');
  var svgWidth = 900;
  var svgHeight = 600;
  svg.style('height', svgHeight);
  svg.style('width', svgWidth);

  //enemy component
  //an array of x,y coordinates for each?
  var enemies = [];

  // var generateEnemy = function () {
  //   var newAsteroid = {};
  //   newAsteroid.number = enemies.length + 1;
  //   var temp = Math.floor(Math.random() * 16777216);
  //   newAsteroid.color = 'hsl(360, 100%, ' + (Math.random() * 33 + 33) + '%)';
  //   newAsteroid.size = Math.floor(Math.random() * 15 + 10);
  //   return newAsteroid;
  // };

  var generateEnemy = function () {
    enemyCount++;
    if (enemyCount % 5 === 0) {
      return new Seeker;
    }
      // return new Seeker;
    return new Asteroid;
  };
  

  var updateBoard = function (data) {
    var eleEnemies = d3.select('.board').selectAll('.enemy');
    var seekers = d3.select('.board').selectAll('.seeker');
    var asteroids = d3.select('.board').selectAll('.asteroid');
    

    seekers
      .data(data, function (d) { return d.id; })
      .transition()
      .ease('linear')
      .duration(function(d) {
        return d.duration;
      })
      .attr('cx', function (d) {
        return d.target()[0];
      })
      .attr('cy', function(d) {
        return d.target()[1];
      })
      .attr('r', function (d) {
        return d.size;
      });

    eleEnemies
      .data(data, function (d) { return d.id; })
      .enter()
      .append('circle')
      .attr('class', function(d) {
        return 'enemy ' + d.constructor + ' ' + d.id;
      })
      .attr('cx', function(d) {
        return d.currentLocation[0];
      })
      .attr('cy', function(d) {
        return d.currentLocation[1];
      })
      .attr('r', function (d) {
        return d.size;
      })
      .style('fill', function (d) {
        return d.color;
      })
      .style('stroke', 'black')
      .style('stroke-width', '5px')
      .transition()
      .ease('linear')
      .duration(function(d) {
        return d.duration;
      })
      .attr('cx', function (d) {
        return d.target()[0];
      })
      .attr('cy', function(d) {
        return d.target()[1];
      })
      .each('end', function (d, i) {
        d.target();
      });

    eleEnemies
      .data(data, function (d) { return d.id; })
      .exit()
      .transition().duration(700)
      .ease('linear')
      .style('stroke-width', 0)
      .attr('r', function (d) {
        return d.size * 2;
      })
      .style('opacity', 0)
      .remove();


  };

  updateBoard(enemies);

//-------------------------------------------------------------------//


//-------------------------------------------------------------------//
// Player Handler                                                    //
//-------------------------------------------------------------------//
  var player = svg.select('.player-ship');
  var playerLocation;

  svg.on('mousemove', function() {
    playerLocation = d3.mouse(this);
    player
      .attr('transform', 'translate(' + (playerLocation[0] - 30) + ', ' + (playerLocation[1] - 30) + ')');
  });


//-------------------------------------------------------------------//

//-------------------------------------------------------------------//
// Timers and Difficulty Increase                                    //
//-------------------------------------------------------------------//

  

//-------------------------------------------------------------------//


//-------------------------------------------------------------------//
// Hit Detection & Death Handlers                                    //
//-------------------------------------------------------------------//
  var deathCheck = function () {
    var allEnemies = d3.select('svg').selectAll('.enemy');
    
    var centerX = allEnemies.attr('cx');
    var centerY = allEnemies.attr('cy');
    var radius = allEnemies.attr('r');
    scoreData[1] += 0.1;

    

    allEnemies[0].forEach(function (enemy) {
      if ((Math.abs(playerLocation[0] - enemy.attributes.cx.value) - 15) < enemy.attributes.r.value && (Math.abs(playerLocation[1] - enemy.attributes.cy.value) - 15) < enemy.attributes.r.value) {
        // console.log(radius);
        clearInterval(window.gameOn);
        clearInterval(window.tickDifficulty);
        clearInterval(window.checkForDeath);
        clearInterval(window.updateScore);
        scoreData[0] = Math.max(scoreData[0], scoreData[1]);
        scoreData[1] = 0;
        scoreData[2] += 1;
        scoreUpdater();

        enemies = [];
        updateBoard(enemies);
      }
    });
  };

  

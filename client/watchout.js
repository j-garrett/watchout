
//-------------------------------------------------------------------//
// Score and Whatnot                                                 //
//-------------------------------------------------------------------//
  var gameValues = {
    'high score': 0,
    'current score': 0,
    'collisions': 0
  };



//-------------------------------------------------------------------//

//-------------------------------------------------------------------//
// Button Functions                                                  //
//-------------------------------------------------------------------//
  var gameStart = function () {
    asteroids = [];
    for (var i = 0; i < 5; i++) {
      asteroids.push(generateAsteroid());
    }
    updateBoard(asteroids);

    window.gameOn = setInterval(function () {
      return updateBoard(asteroids);
    }, 50);

    window.tickDifficulty = setInterval(function () {
      if (asteroids.length >= 15) {
        return asteroids.forEach(function(x) {
          if (x.size < 50) {
            x.size++;          
          }
          return;
        });
      } else {
        return asteroids.push(generateAsteroid());
      }
    }, Math.random() * 5000 + 2000);

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
  var asteroids = [];

  var generateAsteroid = function () {
    var newAsteroid = {};
    newAsteroid.number = asteroids.length + 1;
    var temp = Math.floor(Math.random() * 16777216);
    newAsteroid.color = 'hsl(360, 100%, ' + (Math.random() * 33 + 33) + '%)';
    newAsteroid.size = Math.floor(Math.random() * 15 + 10);
    return newAsteroid;
  };

  

  var updateBoard = function (data) {
    var selection = d3.select('.board').selectAll('.enemy');

    selection
      .data(data, function (d) { return d.number; })
      .transition()
      .ease('linear')
      .duration(1000)
      .attr('cx', function () {
        return playerLocation[0];
        // return Math.random() * svgWidth;
        // return 500;
      })
      .attr('cy', function() {
        return playerLocation[1];
        // return Math.random() * svgHeight;
        // return 500;
      })
      .attr('r', function (d) {
        return d.size;
      });

    selection
      .data(data, function (d) { return d.number; })
      .enter()
      .append('circle')
      .attr('class', 'enemy')
      .attr('cx', function() {
        return svgWidth / 2;
      })
      .attr('cy', function() {
        return svgHeight / 2;
      })
      .attr('r', function (d) {
        return d.size;
      })
      .style('fill', function (d) {
        return d.color;
      })
      .style('stroke', 'black')
      .style('stroke-width', '5px');

    selection
      .data(data, function (d) { return d.number; })
      .exit()
      .transition().duration(3000)
      .ease('linear')
      .attr('cy', function () {
        return svgHeight - 800;
      })
      .remove();
  };

  updateBoard(asteroids);

//-------------------------------------------------------------------//


//-------------------------------------------------------------------//
// Player Handler                                                    //
//-------------------------------------------------------------------//
  var player = svg.select('.player-ship');
  var playerLocation;

  svg.on('mousemove', function() {
    playerLocation = d3.mouse(this);
    gameValues['current score'] += 0.1;
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

    

    allEnemies[0].forEach(function (enemy) {
      if ((Math.abs(playerLocation[0] - enemy.attributes.cx.value) - 15) < radius && (Math.abs(playerLocation[1] - enemy.attributes.cy.value) - 15) < radius) {
        // console.log(radius);
        clearInterval(window.gameOn);
        clearInterval(window.tickDifficulty);
        clearInterval(window.checkForDeath);
        asteroids = [];
        updateBoard(asteroids);
      }
    });
  };

  

  //   var simulation = d3.forceSimulation(allEnemies);
  //   simulation.on('tick', function() {
  // updateBoard(asteroids);
  //   });

  // var selection = d3.select('.board').selectAll('.enemy');

  // selection
  //   .data(data, function (d) { return d.number; })
  //   .transition().duration(3000)
  //   .attr('cx', function () {
  //     return Math.random() * svgWidth;
  //   })

//-------------------------------------------------------------------//




// var dataset = [5, 10, 15, 20, 25];
// d3.select('body').selectAll('p')
//   .data(dataset)
//   .enter()
//   .append('p')
//   .text(function(d, i) {
//     return 'the data value is: ' + d + ' at index ' + i;
//   })
//   .style('color', function(d, i) {
//     if (i % 2 === 0) {
//       return 'black';
//     } else {
//       return 'red';
//     }
//   });


// d3.select('.board').selectAll('div')
//   .data(asteroids)
//   .enter()
//   .append('div')
//   .attr('class', 'enemy');

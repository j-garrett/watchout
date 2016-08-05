
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
    newAsteroid.color = '#' + temp.toString(16);
    newAsteroid.size = Math.floor(Math.random() * 15 + 10);
    return newAsteroid;
  };

  for (var i = 0; i < 5; i++) {
    asteroids.push(generateAsteroid());
  };

  var updateBoard = function (data) {
    var selection = d3.select('.board').selectAll('.enemy');

    selection
      .data(data, function (d) { return d.number; })
      .transition().duration(3000)
      .attr('cx', function () {
        return Math.random() * svgWidth;
      })
      .attr('cy', function() {
        return Math.random() * svgHeight;
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
        return svgHeight - 800;
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

  svg.on('mousemove', function() {
    var playerLocation = d3.mouse(this);

    player
      .attr('transform', 'translate(' + (playerLocation[0] - 30) + ', ' + (playerLocation[1] - 30) + ')');


  });


//-------------------------------------------------------------------//

//-------------------------------------------------------------------//
// Timers and Difficulty Increase                                    //
//-------------------------------------------------------------------//

  var gameOn = setInterval(function () {
    return updateBoard(asteroids);
  }, 2000);

  var tickDifficulty = setInterval(function () {
    if (asteroids.length >= 10) {
      return asteroids.forEach(function(x) {
        return x.size++;
      });
    } else {
      return asteroids.push(generateAsteroid());
    }
  }, 10000);

//-------------------------------------------------------------------//


//-------------------------------------------------------------------//
// Hit Detection & Death Handlers                                    //
//-------------------------------------------------------------------//
  var allCircles = d3.select('svg').selectAll('circle');
  // var deathCheck = function () {
  //   allCircles.forEach(function (circle) {
  //     if (circle.x)
  //   })
  // }

  // var














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

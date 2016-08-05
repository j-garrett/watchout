// start slingin' some d3 here.

var gameValues = {
  'high score': 0,
  'current score': 0,
  'collisions': 0
};
//board components
var svg = d3.select('.board');
var svgWidth = 900;
var svgHeight = 600;
svg.style('height', svgHeight);
svg.style('width', svgWidth);

//enemy component
//an array of x,y coordinates for each?
var asteroids = [0, 0, 0, 0, 0, 0, 0];
svg.selectAll('circle')
  .data(asteroids)
  .enter().append('circle')
  .attr('cx', function() {
    return Math.random() * svgWidth;
  })
  .attr('cy', function() {
    return Math.random() * svgHeight;
  })
  .attr('r', 50);




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

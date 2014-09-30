(function() {
  var dataNum, dataset, height, i, max_num, padding, rScale, random, svg, width, x, xAxis, xScale, y, yAxis, yScale, _i;

  dataset = [];

  dataNum = 50;

  max_num = 1000;

  random = function() {
    return Math.floor(Math.random() * max_num);
  };

  for (i = _i = 0; 0 <= dataNum ? _i < dataNum : _i > dataNum; i = 0 <= dataNum ? ++_i : --_i) {
    x = random();
    y = random();
    dataset.push([x, y]);
  }

  padding = 50;

  width = window.innerWidth - padding * 2;

  height = 500;

  svg = d3.select('#js-d3').append('svg').attr({
    'width': width,
    'height': height
  });

  xScale = d3.scale.linear().domain([
    0, d3.max(dataset, function(d) {
      return d[0];
    })
  ]).rangeRound([padding, width - padding]);

  yScale = d3.scale.linear().domain([
    0, d3.max(dataset, function(d) {
      return d[1];
    })
  ]).rangeRound([height - padding, padding]);

  rScale = d3.scale.linear().domain([
    0, d3.max(dataset, function(d) {
      return d[1];
    })
  ]).range([5, 10]).nice();

  svg.selectAll('circle').data(dataset).enter().append('circle').attr({
    'cx': function(d) {
      return xScale(d[0]);
    },
    'cy': function(d) {
      return yScale(d[1]);
    },
    'r': function(d) {
      return rScale(d[1]);
    }
  });

  xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(5);

  yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5);

  svg.append('g').attr({
    'class': 'axis',
    'transform': 'translate(0, ' + (height - padding) + ')'
  }).call(xAxis);

  svg.append('g').attr({
    'class': 'axis',
    'transform': 'translate(' + padding + ', 0)'
  }).call(yAxis);

}).call(this);

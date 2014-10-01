(function() {
  var circle, circleAttr, circles, className, data_num, dataset, el, fontSize, height, i, max, min, padding, r, randomData, svg, textAttr, textHide, textVisible, update, width, xAxis, xScale, yAxis, yScale, _i, _ref;

  data_num = 50;

  width = 600;

  height = 400;

  padding = 50;

  min = 5;

  max = 1000;

  randomData = function() {
    var dataset, maxX, maxY, n, random, x, y, _i;
    dataset = [];
    random = function(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    };
    maxX = random(min, max);
    maxY = random(min, max);
    for (n = _i = 0; 0 <= data_num ? _i < data_num : _i > data_num; n = 0 <= data_num ? ++_i : --_i) {
      x = random(5, maxX);
      y = random(5, maxY);
      dataset.push([x, y]);
    }
    return dataset;
  };

  dataset = randomData();

  svg = d3.select('#js-d3').append('svg').attr({
    'width': width,
    'height': height
  });

  svg.append('clipPath').attr({
    'id': 'chart-area'
  }).append('rect').attr({
    'x': padding,
    'y': padding,
    'width': width - padding * 2,
    'height': height - padding * 2
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

  r = 5;

  circleAttr = {
    'class': function(d, i) {
      return 'data' + i;
    },
    'cx': function(d) {
      return xScale(d[0]);
    },
    'cy': function(d) {
      return yScale(d[1]);
    },
    'r': function(d) {
      return r;
    }
  };

  svg.append('g').attr({
    'clip-path': 'url(#chart-area)'
  }).selectAll('circle').data(dataset).enter().append('circle').attr(circleAttr);

  fontSize = 12;

  textAttr = {
    'class': function(d, i) {
      return 'data' + i;
    },
    'x': function(d) {
      return xScale(d[0]) - fontSize * 2;
    },
    'y': function(d) {
      return yScale(d[1]) - fontSize;
    },
    'display': 'none',
    'font-size': fontSize + 'px',
    'fill': 'deepskyblue'
  };

  svg.append('g').selectAll('text').data(dataset).enter().append('text').text(function(d) {
    return d;
  }).attr(textAttr);

  xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(5);

  svg.append('g').attr({
    'class': 'x axis',
    'transform': 'translate(0, ' + (height - padding) + ')'
  }).call(xAxis);

  yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5);

  svg.append('g').attr({
    'class': 'y axis',
    'transform': 'translate(' + padding + ', 0)'
  }).call(yAxis);

  update = function() {
    var duration;
    dataset = randomData();
    duration = 1000;
    xScale.domain([
      0, d3.max(dataset, function(d) {
        return d[0];
      })
    ]);
    yScale.domain([
      0, d3.max(dataset, function(d) {
        return d[1];
      })
    ]);
    d3.selectAll('circle').data(dataset).transition().duration(duration).each('start', function() {
      return d3.select(this).attr({
        'fill': 'deepskyblue',
        'r': 3
      });
    }).attr(circleAttr).transition().duration(duration / 2).attr({
      'fill': 'black',
      'r': r
    });
    d3.selectAll('text').data(dataset).text(function(d) {
      return d;
    }).attr(textAttr);
    svg.select('.x.axis').transition().duration(duration).call(xAxis);
    return svg.select('.y.axis').transition().duration(duration).call(yAxis);
  };

  d3.select('#js-p').on('click', update);

  circles = document.querySelectorAll('circle');

  className = '';

  el = '';

  textVisible = function(e) {
    className = e.target.attributes[0].value;
    el = document.getElementsByClassName(className);
    return el[1].style.display = 'block';
  };

  textHide = function(e) {
    return el[1].style.display = 'none';
  };

  for (i = _i = 0, _ref = circles.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    circle = circles[i];
    circle.addEventListener('mouseenter', textVisible, false);
    circle.addEventListener('mouseleave', textHide, false);
  }

}).call(this);

(function() {
  var dataset, fontSize, height, randomChange, randomDataset, rectAttr, svg, textPosition, width, xScale, yScale;

  dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

  width = 600;

  height = 250;

  fontSize = 12;

  svg = d3.select('#js-d3').append('svg').attr({
    'width': width,
    'height': height
  });

  xScale = d3.scale.ordinal().domain(d3.range(dataset.length)).rangeRoundBands([0, width], 0.06);

  yScale = d3.scale.linear().domain([0, d3.max(dataset)]).range([0, height]);

  rectAttr = {
    'x': function(d, i) {
      return xScale(i);
    },
    'y': function(d) {
      return height - yScale(d);
    },
    'width': xScale.rangeBand(),
    'height': function(d) {
      return yScale(d);
    },
    'fill': function(d) {
      return 'rgb(0, 0, ' + (d * 10) + ')';
    }
  };

  svg.selectAll('rect').data(dataset).enter().append('rect').attr(rectAttr);

  textPosition = {
    'x': function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    },
    'y': function(d, i) {
      return (height - yScale(d)) + fontSize + 5;
    }
  };

  svg.selectAll('text').data(dataset).enter().append('text').text(function(d) {
    return d;
  }).attr(textPosition).attr({
    'fill': 'white',
    'font-size': fontSize + 'px',
    'text-anchor': 'middle'
  });

  randomDataset = function() {
    var d, i, random, _i, _ref;
    d = [];
    random = function(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    };
    for (i = _i = 0, _ref = dataset.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      d.push(random(3, 25));
    }
    return d;
  };

  randomChange = function() {
    var delay, duration;
    dataset = randomDataset();
    duration = 500;
    delay = 30;
    svg.selectAll('rect').data(dataset).transition().duration(duration).delay(function(d, i) {
      return i * delay;
    }).attr(rectAttr);
    return svg.selectAll('text').data(dataset).transition().duration(duration).delay(function(d, i) {
      return i * delay;
    }).text(function(d) {
      return d;
    }).attr(textPosition);
  };

  d3.select('#js-p').on('click', randomChange);

}).call(this);

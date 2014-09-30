(function() {
  var data, data_num, dataset, height, n, random, svg, width, x, y, _i;

  dataset = [];

  data_num = 10;

  width = 500;

  height = 300;

  random = function(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  };

  for (n = _i = 0; 0 <= data_num ? _i < data_num : _i > data_num; n = 0 <= data_num ? ++_i : --_i) {
    data = [];
    x = random(5, width - 5);
    y = random(5, height - 5);
    data.push(x, y);
    dataset.push(data);
  }

  svg = d3.select('#js-d3').append('svg').attr({
    'width': width,
    'height': height
  });

  svg.selectAll('circle').data(dataset).enter().append('circle').attr({
    'cx': function(d) {
      return d[0];
    },
    'cy': function(d) {
      return d[1];
    },
    'r': function(d) {
      var sum;
      sum = (d[0] + d[1]) / 2;
      return Math.floor(Math.sqrt(sum));
    }
  });

  svg.selectAll('text').data(dataset).enter().append('text').text(function(d) {
    return d[0] + ',' + d[1];
  }).attr({
    'x': function(d) {
      return d[0];
    },
    'y': function(d) {
      return d[1] - 15;
    },
    'font-size': '14px',
    'fill': 'red',
    'text-anchor': 'middle'
  });

}).call(this);

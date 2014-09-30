(function() {
  var data_max, data_min, data_num, data_scale, dataset, gutter, height, n, random, svg, width, _i;

  dataset = [];

  data_num = 20;

  data_min = 10;

  data_max = 30;

  width = 500;

  height = 200;

  gutter = 2;

  data_scale = 5;

  random = function(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  };

  for (n = _i = 0; 0 <= data_num ? _i < data_num : _i > data_num; n = 0 <= data_num ? ++_i : --_i) {
    dataset.push(random(data_min, data_max));
  }

  svg = d3.select('#js-d3').append('svg').attr({
    'width': width,
    'height': height
  });

  svg.selectAll('rect').data(dataset).enter().append('rect').attr({
    'x': function(d, i) {
      return (width / data_num) * i;
    },
    'y': function(d) {
      return height - d * data_scale;
    },
    'width': width / data_num - gutter,
    'height': function(d) {
      return d * data_scale;
    },
    'fill': function(d) {
      return 'rgb(0, 0, ' + d * 10 + ')';
    }
  });

  svg.selectAll('text').data(dataset).enter().append('text').text(function(d) {
    return d;
  }).attr({
    'x': function(d, i) {
      return (width / data_num) * i + (width / data_num - gutter) / 2;
    },
    'y': function(d) {
      return (height - d * data_scale) + 15;
    },
    'font-size': '12px',
    'fill': 'white',
    'text-anchor': 'middle'
  });

}).call(this);

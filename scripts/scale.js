(function() {
  var dataset, height, padding, rScale, svg, width, xScale, yScale;

  dataset = [[5, 20], [480, 90], [250, 50], [100, 33], [330, 95], [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]];

  padding = 50;

  width = window.innerWidth - padding * 2;

  height = 300;

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
  ]).range([5, 15]).nice();

  svg = d3.select('#js-d3').append('svg').attr({
    'width': width,
    'height': height
  });

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

  svg.selectAll('text').data(dataset).enter().append('text').text(function(d) {
    return d[0] + ',' + d[1];
  }).attr({
    'x': function(d) {
      return xScale(d[0]);
    },
    'y': function(d) {
      return yScale(d[1]) - 15;
    },
    'font-size': '14px',
    'fill': 'red',
    'text-anchor': 'middle'
  });

}).call(this);

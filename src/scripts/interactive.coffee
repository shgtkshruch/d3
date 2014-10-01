# data
dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ]

width = 600
height = 300

svg = d3
  .select '#js-d3'
  .append 'svg'
  .attr
    'width': width
    'height': height

xScale = d3
  .scale.ordinal()
  .domain d3.range dataset.length
  .rangeRoundBands [0, width], 0.05

yScale = d3
  .scale.linear()
  .domain [0, d3.max dataset]
  .range [0, height]

# rect
svg
  .append 'g'
  .selectAll 'rect'
  .data dataset
  .enter()
  .append 'rect'
  .attr
    'x': (d, i) -> xScale i
    'y': (d) -> height - yScale d
    'width': xScale.rangeBand()
    'height': (d) -> yScale d
    'fill': (d) -> 'rgb(0,0,' + (d * 10) + ')'

# text
fontSize = 12
svg
  .append 'g'
  .selectAll 'text'
  .data dataset
  .enter()
  .append 'text'
  .text (d) -> d
  .attr
    'x': (d, i) -> xScale(i) + xScale.rangeBand() / 2
    'y': (d) -> (height - yScale d) + fontSize + 5
    'fill': 'white'
    'font-size': fontSize + 'px'
    'text-anchor': 'middle'

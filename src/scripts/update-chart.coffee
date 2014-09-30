# data
dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ]

width = 600
height = 250

fontSize = 12

# svg
svg = d3
  .select '#js-d3'
  .append 'svg'
  .attr
    'width': width
    'height': height

# scale
xScale = d3
  .scale.ordinal()
  .domain d3.range dataset.length
  .rangeRoundBands [0, width], 0.06

yScale = d3
  .scale.linear()
  .domain [0, d3.max dataset]
  .range [0, height]

# rect
rectAttr = 
  'x': (d, i) -> xScale i
  'y': (d) -> height - yScale d
  'width': xScale.rangeBand()
  'height': (d) -> yScale d
  'fill': (d) -> 'rgb(0, 0, ' + (d * 10) + ')'

svg
  .selectAll 'rect'
  .data dataset
  .enter()
  .append 'rect'
  .attr rectAttr

# text
textPosition =
  'x': (d, i) -> xScale(i) + xScale.rangeBand() / 2
  'y': (d, i) -> (height - yScale d) + fontSize + 5

svg
  .selectAll 'text'
  .data dataset
  .enter()
  .append 'text'
  .text (d) -> d
  .attr textPosition
  .attr
    'fill': 'white'
    'font-size': fontSize + 'px'
    'text-anchor': 'middle'

# event
randomDataset = ->
  d = []

  random = (min, max) ->
    min + Math.floor Math.random() * (max - min + 1)

  for i in [0...dataset.length]
    d.push random 3, 25
  d

randomChange = ->
  dataset = randomDataset()
  duration = 500
  delay = 30

  svg
    .selectAll 'rect'
    .data dataset
    .transition()
    .duration duration
    .delay (d, i) -> i * delay
    .attr rectAttr

  svg
    .selectAll 'text'
    .data dataset
    .transition()
    .duration duration
    .delay (d, i) -> i * delay
    .text (d) -> d
    .attr textPosition

d3.select '#js-p'
  .on 'click', randomChange



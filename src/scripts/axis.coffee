# dataset
dataset = []
dataNum = 50
max_num = 1000

random = ->
  Math.floor Math.random() * max_num

for i in [0...dataNum]
  x = random()
  y = random()
  dataset.push [x, y]


padding = 50
width = window.innerWidth - padding * 2
height = 500

# svg
svg = d3
  .select '#js-d3'
  .append 'svg'
  .attr
    'width': width
    'height': height

# scale
xScale = d3
  .scale.linear()
  .domain [0, d3.max dataset, (d) -> d[0]]
  .rangeRound [padding, width - padding]

yScale = d3
  .scale.linear()
  .domain [0, d3.max dataset, (d) -> d[1]]
  .rangeRound [height - padding, padding]

rScale = d3
  .scale.linear()
  .domain [0, d3.max dataset, (d) -> d[1]]
  .range [5, 10]
  .nice()

# circle
svg
  .selectAll 'circle'
  .data dataset
  .enter()
  .append 'circle'
  .attr
    'cx': (d) -> xScale d[0]
    'cy': (d) -> yScale d[1]
    'r': (d) -> rScale d[1]

# axis
xAxis = d3
  .svg.axis()
  .scale xScale
  .orient 'bottom'
  .ticks 5

yAxis = d3
  .svg.axis()
  .scale yScale
  .orient 'left'
  .ticks 5

svg
  .append 'g'
  .attr 
    'class': 'axis'
    'transform': 'translate(0, ' + (height - padding) + ')'
  .call xAxis

svg
  .append 'g'
  .attr 
    'class': 'axis'
    'transform': 'translate(' + padding + ', 0)'
  .call yAxis

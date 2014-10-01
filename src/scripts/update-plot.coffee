# data
data_num = 50

# svg
width = 600
height = 400
padding =50

min = 5
max = 1000

randomData = ->
  dataset = []

  random = (min, max) ->
    min + Math.floor Math.random() * (max - min + 1)

  maxX = random min, max
  maxY = random min, max

  for n in [0...data_num]
    x = random 5, maxX
    y = random 5, maxY
    dataset.push [x, y]

  dataset

dataset = randomData()

# svg
svg = d3
  .select '#js-d3'
  .append 'svg'
  .attr
    'width': width
    'height': height

# clippath
svg
  .append 'clipPath'
  .attr
    'id': 'chart-area'
  .append 'rect'
  .attr
    'x': padding
    'y': padding
    'width': width - padding * 2
    'height': height - padding * 2

# scale
xScale = d3
  .scale.linear()
  .domain [0, d3.max dataset, (d) -> d[0]]
  .rangeRound [padding, width - padding]

yScale = d3
  .scale.linear()
  .domain [0, d3.max dataset, (d) -> d[1]]
  .rangeRound [height - padding, padding]

# circle
r = 5

circleAttr = 
  'class': (d, i) -> 'data' + i
  'cx': (d) -> xScale d[0]
  'cy': (d) -> yScale d[1]
  'r': (d) -> r

svg
  .append 'g'
  .attr
    'clip-path': 'url(#chart-area)'
  .selectAll 'circle'
  .data dataset 
  .enter()
  .append 'circle'
  .attr circleAttr

# text
fontSize = 12
textAttr =
  'class': (d, i) -> 'data' + i
  'x': (d) -> xScale(d[0]) - fontSize * 2
  'y': (d) -> yScale(d[1]) - fontSize
  'display': 'none'
  'font-size': fontSize + 'px'
  'fill': 'deepskyblue'

svg
  .append 'g'
  .selectAll 'text'
  .data dataset
  .enter()
  .append 'text'
  .text (d) -> d
  .attr textAttr

# axis
xAxis = d3
  .svg.axis()
  .scale xScale
  .orient 'bottom'
  .ticks 5

svg
  .append 'g'
  .attr
    'class': 'x axis'
    'transform': 'translate(0, ' + (height - padding) + ')'
  .call xAxis

yAxis = d3
  .svg.axis()
  .scale yScale
  .orient 'left'
  .ticks 5

svg
  .append 'g'
  .attr
    'class': 'y axis'
    'transform': 'translate(' + padding + ', 0)'
  .call yAxis

# update
update = ->
  dataset = randomData()
  duration = 1000

  # update scale
  xScale.domain [ 0, d3.max dataset, (d) -> d[0] ]
  yScale.domain [ 0, d3.max dataset, (d) -> d[1] ]

  # circle
  d3
    .selectAll 'circle'
    .data dataset
    .transition()
    .duration duration
    .each 'start', ->
      d3
        .select @
        .attr
          'fill': 'deepskyblue'
          'r': 3
    .attr circleAttr
    .transition()
    .duration duration / 2
    .attr
      'fill': 'black'
      'r': r

  # text
  d3
    .selectAll 'text'
    .data dataset
    .text (d) -> d
    .attr textAttr

  # axis
  svg
    .select '.x.axis'
    .transition()
    .duration duration
    .call xAxis

  svg
    .select '.y.axis'
    .transition()
    .duration duration
    .call yAxis

d3
  .select '#js-p'
  .on 'click', update

# hover event 
circles = document.querySelectorAll 'circle'
className = ''
el = ''

textVisible = (e) ->
  className = e.target.attributes[0].value
  el = document.getElementsByClassName className
  el[1].style.display = 'block'

textHide = (e) ->
  el[1].style.display = 'none'

for i in [0...circles.length]
  circle = circles[i]

  circle.addEventListener 'mouseenter', textVisible, false
  circle.addEventListener 'mouseleave', textHide, false

dataset = [
  [5, 20]
  [480, 90]
  [250, 50]
  [100, 33]
  [330, 95]
  [410, 12]
  [475, 44]
  [25, 67]
  [85, 21]
  [220, 88]
]
padding = 50
width = window.innerWidth - padding * 2
height = 300

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
  .range [5, 15]
  .nice()

# svg
svg = d3
  .select '#js-d3'
  .append 'svg'
  .attr
    'width': width
    'height': height

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

# coodinate
svg
  .selectAll 'text'
  .data dataset
  .enter()
  .append 'text'
  .text (d) -> d[0] + ',' + d[1]
  .attr
    'x': (d) -> xScale d[0]
    'y': (d) -> yScale(d[1]) - 15
    'font-size': '14px'
    'fill': 'red'
    'text-anchor': 'middle'

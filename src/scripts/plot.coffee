# data
dataset = []
data_num = 10

# svg
width = 500
height = 300

random = (min, max) ->
  min + Math.floor Math.random() * (max - min)

for n in [0...data_num]
  data = []
  x = random 5, width - 5
  y = random 5, height - 5
  data.push x, y
  dataset.push data

# svg object
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
    'cx': (d) -> d[0]
    'cy': (d) -> d[1]
    'r': (d) -> 
      sum = (d[0] + d[1]) / 2
      Math.floor Math.sqrt sum

# coordinate
svg
  .selectAll 'text'
  .data dataset
  .enter()
  .append 'text'
  .text (d) -> d[0] + ',' + d[1]
  .attr
    'x': (d) -> d[0]
    'y': (d) -> d[1] - 15
    'font-size': '14px'
    'fill': 'red'
    'text-anchor': 'middle'

#data
dataset = []
data_num = 20
data_min = 10
data_max = 30

# svg
width = 500
height = 200
gutter = 2
data_scale = 5

random = (min, max) ->
  min + Math.floor Math.random() * (max - min)

for n in [0...data_num]
  dataset.push random data_min, data_max

svg = d3.select '#js-d3'
  .append 'svg'
  .attr
    'width': width
    'height': height

svg.selectAll 'rect'
  .data dataset
  .enter()
  .append 'rect'
  .attr
    'x': (d, i) -> (width / data_num) * i
    'y': (d) -> height - d * data_scale
    'width': width / data_num - gutter
    'height': (d) -> d * data_scale
    'fill': (d) -> 'rgb(0, 0, ' + d * 10 + ')'

svg.selectAll 'text'
  .data dataset
  .enter()
  .append 'text'
  .text (d) -> d
  .attr
    'x': (d, i) -> (width / data_num) * i + (width / data_num - gutter) / 2
    'y': (d) -> (height - d * data_scale) + 15
    'font-size': '12px'
    'fill': 'white'
    'text-anchor': 'middle'

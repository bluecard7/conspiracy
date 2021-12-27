import { select } from 'd3'
import { hexbin } from 'd3-hexbin'

import { setupMenu } from './menu'
import './style.css'
/*
  Menu to change size, color of hexagons (maybe even shape)
    - also delete shapes
  Persist points in client storage (maybe with redis)
  Associate points with notes
*/

setupMenu();

const hbin = hexbin().radius(20);
const svg = select('#app')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')

/*
const view = select('#app')
  .append('div')
  .style('z-index', 10)
  .style('position', 'absolute')
  .style('bottom', '0')
  .style('width', '100%')
  .style('height', '150px')
  .style('border-top', '1px solid green')
*/

function renderNote({ x, y }) {
  svg.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .attr('d', `M${x},${y}${hbin.hexagon()}`)
    .on('mouseenter', () => { /* view note in tooltip or viewing area */ })
}
  
svg.on('click', e => {
    renderNote({
      x: e.clientX, 
      y: e.clientY,
    });
  })

const points = [
  [400, 200],
  [100, 100],
]

svg.selectAll('path')
  .data(hbin(points))
  .enter().append('path')
  .attr('fill', 'green')
  .attr('d', renderNote)

import { select } from 'd3'
import { hexbin } from 'd3-hexbin'

import { setupMenu, getSize, getColor, inAddMode, inDeleteMode } from './menu'
import { setupDB, addNote, deleteNote, streamNotes } from './persistence'
import './style.css'

setupDB().then(() => streamNotes(renderNote))
setupMenu()
const hbin = hexbin().radius(getSize())
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
  hbin.radius(getSize())
  svg.append('path')
    .attr('fill', 'transparent')
    .attr('stroke', getColor())
    .attr('d', `M${x},${y}${hbin.hexagon()}`)
    .attr('data-id', `${x}${y}`)
    // only required if searching notes in a selected section
    // .attr('data-x', x)
    // .attr('data-y', y)
    .on('mouseenter', () => { /* view note in tooltip or viewing area */ })
    .on('click', function() {
      if (inDeleteMode()) {
        deleteNote(`${x}${y}`).then(svg.node().removeChild(this)) 
      }
    })
}
  
svg.on('click', e => {
  if (inAddMode()) {
    const { clientX: x, clientY: y } = e ?? {};
    addNote(`${x}${y}`, [x, y], 'this is a test note')
      .then(() => renderNote({ x, y }))
  }
})


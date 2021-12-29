import { select } from 'd3'
import { hexbin } from 'd3-hexbin'

import { setupMenu, getSize, getColor, inAddMode, inDeleteMode } from './menu'
import { setupDB, addNote, deleteNote, streamNotes } from './persistence'
import { promptInput } from './note'
import '../style.css'

const hbin = hexbin().radius(getSize())
const svg = select('#app')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')

function renderNote({ x, y, content, color, size }) {
  hbin.radius(size)
  svg.append('path')
    .attr('fill', 'transparent')
    .attr('stroke', color)
    .attr('d', `M${x},${y}${hbin.hexagon()}`)
    .attr('data-id', `${x}${y}`)
    // only required if searching notes in a selected section
    // .attr('data-x', x)
    // .attr('data-y', y)
    .on('click', function() {
      if (inDeleteMode()) {
        deleteNote(`${x}${y}`).then(svg.node().removeChild(this)) 
      }
    })
    .append('title')
    .node().innerHTML = content
}
  
svg.on('click', e => {
  if (inAddMode()) {
    const { clientX: x, clientY: y } = e ?? {};
    promptInput().then(content => {
      if (!content) return
      const note = {
        id: `${x}${y}`, 
        x, 
        y,
        color: getColor(),
        size: getSize(),
        content,
      }
      addNote(note).then(renderNote)
    })
  }
})

setupDB().then(() => streamNotes(renderNote))
setupMenu()

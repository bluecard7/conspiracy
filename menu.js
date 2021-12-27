const config = {
  radius: 20,
  color: 'green',
  mode: 'add', // vs delete
}

export const menu = document.createElement('div')
menu.id = 'menu'

const closeButton = document.createElement('button')
closeButton.innerHTML = 'X'

const sizeKnob = document.createElement('button')
sizeKnob.innerHTML = 'size'

const colorKnob = document.createElement('input')
colorKnob.type = 'color'

const modeKnob = document.createElement('button')
modeKnob.innerHTML = 'toggle'

menu.appendChild(closeButton)
menu.appendChild(sizeKnob)
menu.appendChild(colorKnob)
menu.appendChild(modeKnob)

export function setupMenu() {
  const appDiv = document.querySelector('#app')

  document.addEventListener('keydown', e => {
    if (e.key === '?') {
      appDiv.appendChild(menu)
    }
  })

  closeButton.onclick = () => {
    appDiv.removeChild(menu)
  }
}

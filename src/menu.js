const config = {
  radius: 20,
  color: 'green',
  mode: 'add',
}

export const menu = document.createElement('div')
menu.id = 'menu'

const closeButton = document.createElement('button')
closeButton.innerHTML = 'X'

const sizeKnob = document.createElement('input')
sizeKnob.type = 'range';
sizeKnob.value = config.radius;
sizeKnob.min = 10;
sizeKnob.max = 50;
sizeKnob.oninput = () => {
  config.radius = sizeKnob.value;
}

const colorKnob = document.createElement('input')
colorKnob.type = 'color'
colorKnob.value = '#11BB1D'
colorKnob.oninput = () => {
  config.color = colorKnob.value;
}

const modeKnob = document.createElement('button')
modeKnob.innerHTML = `Mode: ${config.mode}`
modeKnob.onclick = () => {
  config.mode = config.mode === 'add' ? 'delete' : 'add' 
  modeKnob.innerHTML = `Mode: ${config.mode}`
}

const controls = [closeButton, sizeKnob, colorKnob, modeKnob];
controls.forEach(control => menu.appendChild(control))

controls.forEach(control => { 
  control.className = 'control' 
})

const appDiv = document.querySelector('#app')
export function setupMenu() {
  document.addEventListener('keydown', e => {
    if (e.key === '?') {
      document.querySelector('#menu')
        ? appDiv.removeChild(menu)
        : appDiv.appendChild(menu)
    }
  })

  closeButton.onclick = () => {
    appDiv.removeChild(menu)
  }
}

export const getSize = () => config.radius
export const getColor = () => config.color
export const inAddMode = () => config.mode === 'add'
export const inDeleteMode = () => config.mode === 'delete'

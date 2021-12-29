let modal = document.querySelector('#notepad-modal')
let submitBtn = document.querySelector('#create-button')
let closeBtn = document.querySelector('#discard-button')
let notepad = document.querySelector('#notepad')
notepad.onclick = e => e.stopPropagation()

export function promptInput() {
  modal.style.display = "block";
  return new Promise(resolve => {
    modal.onclick = () => {
      resolve()
      modal.style.display = "none";
    }
    submitBtn.onclick = () => {
      resolve(notepad.value)
      modal.style.display = "none";
      notepad.value = '';
    }
    closeBtn.onclick = () => {
      resolve()
      modal.style.display = "none";
    }
  })
}

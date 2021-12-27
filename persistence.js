const storeName = 'notes'
let db

export function setupDB() {
  const request = window.indexedDB.open("conspiracy-db", 1)

  return new Promise(resolve => {
    request.onupgradeneeded = () => {
      db = request.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, {keyPath: 'id'})
      }
    }
    request.onerror = () => {
      console.error(request.error)
    }
    request.onsuccess = () => {
      db = request.result
      resolve()
    }
    request.onblocked = () => {
      console.error('DB request blocked')
    }
  })
}

export function addNote(id, [x, y], content) {
  let request = db.transaction([storeName], 'readwrite')
    .objectStore(storeName)
    .add({ id, x, y, content })
  
  return new Promise((resolve, reject) => {
    request.onsuccess = resolve
    request.onerror = reject
  })
}

export function deleteNote(id) {
  let request = db.transaction([storeName], 'readwrite')
    .objectStore(storeName)
    .delete(id)

  return new Promise((resolve, reject) => {
    request.onsuccess = resolve
    request.onerror = reject
  })
}

// potentially useful: IDBKeyRange.lowerBound
// Would like to extend this for all queries
export function streamNotes(onNote) {
  let request = db.transaction([storeName], 'readonly')
    .objectStore(storeName)
    .openCursor()

  request.onsuccess = () => {
    let cursor = request.result
    if (cursor) {
      onNote(cursor.value)
      cursor.continue()
    }
  }
}

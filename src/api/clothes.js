import indexedDB from '@/indexedDB'

export default {
  tableName: 'clothes',
  findAll (peopleId, callback) {
    let DB
    indexedDB.openDB(DB, db => {
      DB = db
      const objectStore = DB.transaction(this.tableName).objectStore(this.tableName)
      const list = []
      objectStore.openCursor().onsuccess = event => {
        const cursor = event.target.result
        if (cursor) {
          if (cursor.value.peopleId == peopleId) {
            cursor.value.id = cursor.key
            list.push(cursor.value)
          }
          cursor.continue()
        }
      }
      if (callback && (typeof callback === 'function')) {
        callback(list)
      }
    })
  },
  findById (key, callback) {
    indexedDB.findByKey(this.tableName, key, callback)
  },
  insert (data, callback) {
    indexedDB.insert(this.tableName, data, callback)
  },
  update (key, data) {
    indexedDB.update(this.tableName, key, data)
  },
  delete (key) {
    indexedDB.delete(this.tableName, key)
  }
}

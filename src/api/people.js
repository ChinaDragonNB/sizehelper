import indexedDB from '@/indexedDB'

export default {
  tableName: 'people',
  findAll (callback) {
    indexedDB.findAll(this.tableName, callback)
  },
  insert (data, callback) {
    indexedDB.insert(this.tableName, data, callback)
  },
  findById (key, callback) {
    indexedDB.findByKey(this.tableName, key, callback)
  },
  update (key, data) {
    indexedDB.update(this.tableName, key, data)
  },
  delete (key) {
    indexedDB.delete(this.tableName, key)
  }
}


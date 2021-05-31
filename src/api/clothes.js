import indexedDB from '@/indexedDB'

export default {
  tableName: 'clothes',
  findAll (peopleId, callback) {
    indexedDB.findAll(this.tableName, function (result) {
      const list = []
      result.forEach(function (value, index, arr) {
        if (value.peopleId === peopleId) {
          list.push(value)
        }
      })
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
    lindexedDB.delete(this.tableName, key)
  }
}

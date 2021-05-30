export default {
  // 数据库名称
  dbName: 'sizehelper',
  version: 2,
  tableNames: ['people', 'clothes'],
  tableName: 'clothes',
  openDB (db, callback) {
    const request = window.indexedDB.open(this.dbName, this.version)
    request.onerror = function (event) {
      console.log('IndexedDB数据库打开错误')
    }
    request.onsuccess = event => {
      db = event.target.result
      if (callback && (typeof callback === 'function')) {
        callback(db)
      }
    }
    request.onupgradeneeded = event => {
      const db = event.target.result
      console.log(db)
      // 不存在表就创建一个
      this.tableNames.forEach(function (item, index, arr) {
        db.createObjectStore(item, {
          autoIncrement: true
        })
      })
    }
  },
  findAll (peopleId, callback) {
    let DB
    this.openDB(DB, db => {
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
    let DB
    this.openDB(DB, db => {
      DB = db
      const objectStore = DB.transaction(this.tableName, 'readwrite').objectStore(this.tableName)
      const request = objectStore.get(parseInt(key))
      request.onerror = function () {
        console.log('通过KEY获取数据报错')
      }
      request.onsuccess = event => {
        const result = event.target.result
        if (callback && (typeof callback === 'function')) {
          callback(result)
        }
      }
    })
  },
  insert (data, callback) {
    let DB
    this.openDB(DB, db => {
      DB = db
      let store = DB.transaction(this.tableName, 'readwrite').objectStore(this.tableName), request
      request = store.add(data)
      request.onerror = function () {
        console.error('插入数据报错')
      }
      request.onsuccess = event => {
        if (callback && (typeof callback === 'function')) {
          callback(event.target.result)
        }
      }
    })
  },
  update (key, data) {
    let DB
    this.openDB(DB, db => {
      DB = db
      const objectStore = DB.transaction(this.tableName, 'readwrite').objectStore(this.tableName)
      const request = objectStore.put(data, parseInt(key))
      request.onerror = event => {
      }
      request.onsuccess = event => {
      }

    })
  },
  delete (key) {
    let DB
    this.openDB(DB, db => {
      DB = db
      const objectStore = DB.transaction(this.tableName, 'readwrite').objectStore(this.tableName)
      const request = objectStore.delete(parseInt(key))
      request.onerror = event => {
      }
      request.onsuccess = event => {
      }

    })
  }
}

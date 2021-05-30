// import indexedDB from '@/indexedDB'

export default {
  // 数据库名称
  dbName: 'sizehelper',
  version: 2,
  tableNames: ['people', 'clothes'],
  tableName: 'people',
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
      // 不存在表就创建一个
      this.tableNames.forEach(function (item, index, arr) {
        db.createObjectStore(item, {
          autoIncrement: true
        })
      })
    }
  },
  findAll (callback) {
    let peopleDB
    this.openDB(peopleDB, db => {
      const objectStore = db.transaction(this.tableName).objectStore(this.tableName)
      const list = []
      objectStore.openCursor().onsuccess = event => {
        const cursor = event.target.result
        if (cursor) {
          cursor.value.id = cursor.key
          list.push(cursor.value)
          cursor.continue()
        }
      }
      if (callback && (typeof callback === 'function')) {
        callback(list)
      }
    })
  },
  insert (data, callback) {
    let peopleDB
    this.openDB(peopleDB, db => {
      console.log(db)
      peopleDB = db
      let store = peopleDB.transaction(this.tableName, 'readwrite').objectStore(this.tableName), request
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
  findById (key, callback) {
    let peopleDB
    this.openDB(peopleDB, db => {
      peopleDB = db
      const objectStore = db.transaction(this.tableName, 'readwrite').objectStore(this.tableName)
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
  update (key, data) {
    let peopleDB
    this.openDB(peopleDB, db => {
      peopleDB = db
      const objectStore = peopleDB.transaction(this.tableName, 'readwrite').objectStore(this.tableName)
      const request = objectStore.put(data, parseInt(key))
      request.onerror = event => {
      }
      request.onsuccess = event => {
      }

    })
  },
  delete (key) {
    let peopleDB
    this.openDB(peopleDB, db => {
      peopleDB = db
      const objectStore = peopleDB.transaction(this.tableName, 'readwrite').objectStore(this.tableName)
      const request = objectStore.delete(parseInt(key))
      request.onerror = event => {
      }
      request.onsuccess = event => {
      }

    })
  }
}


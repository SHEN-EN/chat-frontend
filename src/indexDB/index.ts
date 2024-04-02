interface anyEvent {
  [k: string]: any;
}
interface tableOptions {
  tableName: string;
  option: { [k: string]: any };
  index: {
    name: string;
    keyPath: string;
    options?: { [k: string]: any };
  }[];
}

let indexDB: IDBOpenDBRequest;
let dbName: string;
let db: IDBDatabase;

const openDatabase = (databaseName: string, version?: number) => {
  if (!databaseName) return;
  dbName = databaseName;
  return new Promise<IDBDatabase>((resolve, reject) => {
    indexDB = window.indexedDB.open(databaseName, version || 1);
    indexDB.onerror = (e) => {
      reject(e);
    };
    indexDB.onsuccess = (e: anyEvent) => {
      db = e.target.result;
      resolve(db);
    };
  });
};

const createTable = (options: tableOptions[]) => {
  if (!options) return;
  return new Promise<IDBDatabase>((resolve, reject) => {
    indexDB.onupgradeneeded = (e: anyEvent) => {
      db = e.target.result;

      for (const iterator of options) {
        if (!db.objectStoreNames.contains(iterator.tableName)) {
          const objectStore = db.createObjectStore(
            iterator.tableName,
            iterator.option
          );

          for (const iteratorIndex of iterator.index) {
            // 遍历Index
            objectStore.createIndex(
              iteratorIndex.name,
              iteratorIndex.keyPath,
              iteratorIndex?.options
            );
          }
        }
      }
      resolve(db);
    };
  });
};

//获取存储空间对象
const getStore = async (name: string): Promise<IDBObjectStore> => {
  const transaction = await db.transaction([name], "readwrite");
  return transaction.objectStore(name);
};

const insert = (name: string, options: {}) => {
  getStore(name).then((store: IDBObjectStore) => {
    const request = store.add(options);
    request.onsuccess = () => {
      return Promise.resolve("success");
    };
  });
};

const update = (name: string, options: {}) => {
  getStore(name).then((store: IDBObjectStore) => {
    const request = store.put(options);
    request.onsuccess = () => {
      return Promise.resolve("success");
    };
  });
};

const deleted = async (name: string, keyToDelete: string) => {
  const store = await getStore(name);
  return new Promise((resolve, reject) => {
    const request = store.delete(keyToDelete);
    request.onsuccess = () => {
      return resolve("success");
    };
    request.onerror = (event: anyEvent) => {
      return reject(event);
    };
  });
};

const get = async (name: string, key: string, value: string): Promise<any> => {
  const store = await getStore(name);
  return new Promise((resolve, reject) => {
    const index = store.index(key);
    const request = index.openCursor(value);

    let result = [] as any;
    request.onsuccess = (event: anyEvent) => {
      const data = event.target.result;
      if (data) {
        result.push(data.value);
        data.continue();
      } else {
        return resolve(result);
      }
    };
    request.onerror = (event: anyEvent) => {
      return reject(event);
    };
  });
};

const getAll = async (name: string): Promise<any> => {
  const store = await getStore(name);
  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = (event: anyEvent) => {
      const data = event.target.result;
      return resolve(data);
    };
    request.onerror = (event: anyEvent) => {
      return reject(event);
    };
  });
};

export { openDatabase, createTable, insert, update, deleted, get, getAll };

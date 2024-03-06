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
export { openDatabase, createTable };

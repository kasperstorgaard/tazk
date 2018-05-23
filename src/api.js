import 'idb/lib/idb.js';

let dbPromise;

export const addItem = async (storeKey, item) => {
    const {store, transaction} = await startTransaction(storeKey);
    return store.add(item);
}

export const getItem = async (storeKey, id) => {
    const {store, transaction} = await startTransaction(storeKey, 'readonly');
    return store.get(id);
}

export const updateItem = async (storeKey, item) => {
    const {store, transaction} = await startTransaction(storeKey);
    return store.put(item);
};

export const deleteItem = async (storeKey, id) => {
    const {store, transaction} = await startTransaction(storeKey);
    return store.delete(id);
}

export const getItemBy = async (storeKey, by, value) => {
    const {store, transaction} = await startTransaction(storeKey, 'readonly');
    const index = store.index(by);
    return index.get(value);
}

export const getAll = async (storeKey) => {
    const {store, transaction} = await startTransaction(storeKey, 'readonly');
    return store.getAll();
}

async function startTransaction (storeKey, rights = 'readwrite') {
    const db = await getDb();

    const transaction = db.transaction([storeKey], rights);
    const store = transaction.objectStore(storeKey);

    return {
        transaction,
        store
    };
}

function getDb() {
    if (!('indexedDB' in window)) {
      return Promise.reject('not supported');
    }

    if (!dbPromise) {
        dbPromise = createDb();
    }

    return dbPromise;
}

function createDb() {
    return idb.open('tazk-db', 1, upgradeDb => {
        if (!upgradeDb.objectStoreNames.contains('rewards')) {
            createRewardsOS(upgradeDb);
        }

        if (!upgradeDb.objectStoreNames.contains('tasks')) {
            createTasksOS(upgradeDb);
        }

        if (!upgradeDb.objectStoreNames.contains('user')) {
            createUserOS(upgradeDb);
        }
    });
}

async function createRewardsOS(upgradeDb) {
    const store = upgradeDb.createObjectStore('rewards', {
        keyPath: 'id',
        autoIncrement: true
    });

    store.createIndex('name', 'name', {unique: true});
    store.createIndex('fun', 'fun', {unique: false});
    store.createIndex('usedTimes', 'usedTimes', {unique: false});

    await store.add({
        id: '1',
        name: 'high five',
        url: 'https://media.giphy.com/media/120jXUxrHF5QJ2/giphy.gif',
        fun: 0,
        usedTimes: 0
    });

    return store;
}

async function createTasksOS(upgradeDb) {
    const store = upgradeDb.createObjectStore('tasks', {
        keyPath: 'id',
        autoIncrement: true
    });

    store.createIndex('name', 'name', {unique: true});
    store.createIndex('fun', 'fun', {unique: false});
    store.createIndex('difficulty', 'difficulty', {unique: false});
    store.createIndex('completed', 'completed', {unique: false});

    await store.add({
        id: '1',
        name: 'take a walk',
        fun: 1,
        difficulty: 1,
        done: false
    });

    await store.add({
        id: '2',
        name: 'build a wall',
        fun: 0,
        difficulty: 5,
        done: false
    });

    await store.add({
        id: '3',
        name: 'start a band',
        fun: 3,
        difficulty: 2,
        done: false
    });

    return store;
}

function createUserOS(upgradeDb) {
    return upgradeDb.createObjectStore('user');
}

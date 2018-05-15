let dbPromise;

function getDb() {
    if (!('indexedDB' in window)) {
      return Promise.reject('not supported');
    }

    if (!dbPromise) {
        dbPromise = init();
    }

    return dbPromise;
}

function init() {
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
function createRewardsOS(upgradeDb) {
    upgradeDb.createObjectStore('rewards', {keyPath: 'id', autoIncrement: true});
}

function createTasksOS(upgradeDb) {

}

function createUserOS(upgradeDb) {

}

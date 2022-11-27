const { contextBridge } = require('electron');
const Store = require('electron-store');

const store = new Store();

contextBridge.exposeInMainWorld('config', {
    get: (key) => {
        return store.get(key);
    },
    set: (key, val) => {
        store.set(key, val);
    }
});
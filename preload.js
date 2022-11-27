const { contextBridge, ipcRenderer } = require('electron');
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

contextBridge.exposeInMainWorld('loader', {
    listen: (e, cb) => {
        switch(e) {
            case 'update-not-available':
                ipcRenderer.on('update-not-available', () => cb());
            break;
        }   
    }
});
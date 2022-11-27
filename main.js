const { app, ipcMain, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

Store.initRenderer();
const store = new Store();



var win;

app.on('ready', () => {
    win = new BrowserWindow({
        "icon": "assets/icon128px.png",
        titleBarStyle: "hidden",
        movable: true,
        title: "MLauncher",
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('index.html');
});
const { app, ipcMain, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

const store = new Store();

var win;

app.on('ready', () => {
    win = new BrowserWindow();
    win.loadFile('index.html');
});
const { app, BrowserWindow, ipcMain, dialog, webUtils, ipcRenderer } = require('electron');
const path = require('path');
const fs = require("fs");

fileLoc = require('./SCRIPT/workspaceRender');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,

    webPreferences: {
      nodeIntegration: false, // Use 'false' for security reasons
      preload: path.join(__dirname, 'preload.js')  // Preload script if needed
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html')); // Or loadFile() for local files
}

// Listen for the open window event (can be triggered by IPC)
ipcMain.on('open-about-window', () => {
  // Create a new window
  const aboutWindow = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: false,
    skipTaskbar: true,
    frame: false,

    webPreferences: {
      nodeIntegration: false, // Use 'false' for security reasons
      preload: path.join(__dirname, 'preload.js')  // Preload script if needed
    }
  });

  // Load the content for the new window
  aboutWindow.loadFile(path.join(__dirname, 'SHEETS/about.html'));  // Or use loadFile() to load a local HTML file
});


ipcMain.on('open-input', () => {
    mainWindow.loadFile(path.join(__dirname, "SHEETS/workspace.html"));
});

ipcMain.on('save-file', (event, fileLoc, content) => {
  console.log(fileLoc);
});

ipcMain.on('show-msg', (event, msg) => {
  const options = {
    type: 'warning',
    buttons: ['Okay'],
    defaultId: 0,
    title: 'Warning',
    message: msg,
    detail: ''
  };

  dialog.showMessageBox(options);
});

ipcMain.on('get-file-path', (event) => {

  console.log("hello2");
  dialog.showOpenDialog({
        properties: ['openFile']
  }).then(files => {
    fileLoc = files.filePaths[0];
  });
});


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

});

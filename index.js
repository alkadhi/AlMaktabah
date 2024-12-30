const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

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

  mainWindow.loadFile(path.join(__dirname, 'SHEETS/workspace.html')); // Or loadFile() for local files
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
    mainWindow.loadFile(path.join(__dirname, "SHEETS/inputFile.html"));
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

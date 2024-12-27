const { contextBridge, ipcRenderer } = require('electron');

// Expose a method to the renderer to trigger opening a new window
contextBridge.exposeInMainWorld('electron', {
  openNewWindow: () => ipcRenderer.send('open-about-window')
});

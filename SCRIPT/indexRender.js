const { ipcRenderer } = require("electron");

document.getElementById("abtBtn").addEventListener('click', () => {
    // Send IPC message to main process to open a new window
    ipcRenderer.send('open-about-window')
});

document.getElementById("openFile").addEventListener('click', () => {
    // Send IPC message to main process to open a new window
    ipcRenderer.send('open-input');

});
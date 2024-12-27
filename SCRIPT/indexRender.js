document.getElementById("abtBtn").addEventListener('click', () => {
    // Send IPC message to main process to open a new window
    window.electron.openNewWindow();
});
  
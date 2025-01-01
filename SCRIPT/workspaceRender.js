const {ipcRenderer, ipcMain} = require("electron");
let fileLoc;

document.getElementById("saveBtn").addEventListener("click", () => {

    if (fileLoc == undefined){
        ipcRenderer.send("show-msg", "لم تختر بقعة للحفظ");
    } else {

        

        ipcRenderer.send("save-file", fileLoc, document.getElementById("code-area").value);


    }

});

document.getElementById("file-upload").addEventListener("click", (event) => {

    ipcRenderer.send("get-file-location");
    
});

ipcRenderer.on("file-save-found", (event, fileLocation) => {
    
    fileLoc = fileLocation

    document.getElementById("file-loc-display").textContent = fileLoc;

});

ipcRenderer.on("file-save-data", (event, data) => {
    
    document.getElementById("code-area").textContent = data;

});
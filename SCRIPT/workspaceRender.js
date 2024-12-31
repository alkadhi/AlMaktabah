let fileLoc;

document.getElementById("saveBtn").addEventListener("click", () => {

    if (fileLoc == undefined){

        

    } else {
        window.electron.saveFileBtn(fileLoc, document.getElementById("code-area").value);
    }
});
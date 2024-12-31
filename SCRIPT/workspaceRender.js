export var fileLoc;

document.getElementById("saveBtn").addEventListener("click", () => {

    if (fileLoc == undefined){

        window.electron.showDialog("لم تختر بقعة للحفظ");

    } else {
        window.electron.saveFileBtn(fileLoc, document.getElementById("code-area").value);
    }
});

document.getElementById("file-upload").addEventListener("click", (event) => {

    console.log(getFile());
    
});
function manipulateFileList() {

    // check to see which way the file list should go
    if(document.getElementsByClassName("fa-arrow-left")[0]) {
        var parent = document.getElementsByClassName("content");
        document.getElementById("preview-wrapper").style.width = "29%";

        // Switch icon from left arrow to right arrow
        var icon = document.getElementsByClassName("fa-arrow-left");
        icon = icon[0]; // get the first and only one
        icon.className = "fa fa-arrow-right fa-2x";

        // create the file list and dynamically append it
        var fileList = document.createElement("div");
        fileList.style.float = "right";
        fileList.style["border-left"] = "1px solid black";
        fileList.style.height = "90%";
        fileList.style.width = "20%"
        fileList.id = "file-list";
        fileList.parentNode = parent[0];

        //TODO put stuff in the file list here

        parent[0].appendChild(fileList);
    }

    else {
        // reset styles
        document.getElementById("preview-wrapper").style.width = "47%";

        // switch icon back to left arrow
        var icon = document.getElementsByClassName("fa-arrow-right");
        icon = icon[0]; // get the first and only one
        icon.className = "fa fa-arrow-left fa-2x";

        // remove element
        var fileList = document.getElementById("file-list");
        if(fileList.parentNode) {
            fileList.parentNode.removeChild(fileList);
        }
    }
}

function prepDownload() {
    var blob = new Blob([document.getElementById("text-input").value], {type: "text"});
    var url = URL.createObjectURL(blob);
    document.getElementById("download-link").href = url;
}

function deleteFile() {
    chrome.storage.sync.remove('md_file');
}

function saveFile() {
    var file = document.getElementById("text-input").value;

    // TODO: error checking
    chrome.storage.sync.set({'md_file': file});
}

function loadFile() {
    chrome.storage.sync.get('md_file', function(items) {
        if(items.md_file !== undefined) {
            document.getElementById("text-input").value = items.md_file;
        }
    });
}

function Editor(input, preview) {
    this.update = function () {
        preview.innerHTML = markdown.toHTML(input.value);
        prepDownload(); //seems like a bad solution
    };
    input.editor = this;
    input.oninput = this.update;
    this.update();
}

// Get around CSP by selecting element by ID
var div = document.getElementById("text-div");
div.innerHTML = '<textarea id="text-input">Type **Markdown** here.</textarea>'
new Editor(document.getElementById(("text-input")), document.getElementById(("preview")));

// Same deal as above but with the buttons
var saveButton = document.getElementById("save-button");
var loadButton = document.getElementById("load-button");
var deleteButton = document.getElementById("delete-button");
var fileListButton = document.getElementById("file-list-button");
saveButton.addEventListener("click", saveFile, false);
loadButton.addEventListener("click", loadFile, false);
deleteButton.addEventListener("click", deleteFile, false);
fileListButton.addEventListener("click", manipulateFileList, false);

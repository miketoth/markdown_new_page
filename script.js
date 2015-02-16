function openFileList() {

    // check which way the arrow is facing before doing anything else
    // right ==> collapse stuff
    // left ==> open stuff

    var parent = document.getElementsByClassName("content");
    document.getElementById("preview").style.width = "24%";
    document.getElementById("preview").style.border = "1px solid red";

    // Switch icon from left arrow to right arrow
    var icon = document.getElementsByClassName("fa-arrow-left");
    icon = icon[0]; // get the first and only one
    icon.className = "fa fa-arrow-right fa-2x";

    // create the file list and dynamically append it
    var fileList = document.createElement("div");
    fileList.style.float = "right";
    fileList.style["border-left"] = "1px solid black";
    fileList.style.height = "88%";
    fileList.style.width = "25%"

    //var saveButton = document.createElement(

    parent[0].appendChild(fileList);
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
fileListButton.addEventListener("click", openFileList, false);

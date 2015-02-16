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
div.innerHTML = '<textarea id="text-input" rows="34" cols="75">Type **Markdown** here.</textarea>'
new Editor(document.getElementById(("text-input")), document.getElementById(("preview")));

// Same deal as above but with the buttons
var saveButton = document.getElementById("save-button");
var loadButton = document.getElementById("load-button");
var deleteButton = document.getElementById("delete-button");
saveButton.addEventListener("click", saveFile, false);
loadButton.addEventListener("click", loadFile, false);
deleteButton.addEventListener("click", deleteFile, false);

function deleteFile() {
    chrome.storage.sync.remvoe('md_file');
}

function saveFile() {
    var file = document.getElementById("text-input").value;
    console.log(file);
    chrome.storage.sync.set({'md_file': file}, function(){
        console.log("FILE SAVED!");
    });
}

function loadFile() {
    chrome.storage.sync.get('md_file', function(items) {
        console.log(items);
        document.getElementById("text-input").value = items.md_file;
    });
}

function Editor(input, preview) {
    this.update = function () {
        preview.innerHTML = markdown.toHTML(input.value);
    };
    input.editor = this;
    input.oninput = function() {
        preview.innerHTML = markdown.toHTML(input.value);
    };
    this.update();
}
var $ = function (id) { return document.getElementById(id); };

// Get around CSP by selecting element by ID
var div = document.getElementById("text-div");
div.innerHTML = '<textarea id="text-input" rows="34" cols="75">Type **Markdown** here.</textarea>'
new Editor($("text-input"), $("preview"));

// Same deal as above but with the buttons
var saveButton = document.getElementById("save-button");
var loadButton = document.getElementById("load-button");
var deleteButton = document.getElementById("delete-button");
saveButton.addEventListener("click", saveFile, false);
loadButton.addEventListener("click", loadFile, false);
deleteButton.addEventListener("click", deleteFile, false);

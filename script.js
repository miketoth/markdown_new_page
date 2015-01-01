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
var div = document.getElementById("text-div");
div.innerHTML = '<textarea id="text-input" rows="6" cols="60">Type **Markdown** here.</textarea>'
new Editor($("text-input"), $("preview"));

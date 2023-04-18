// JavaScript for the editors
var htmlEditor = ace.edit("html-editor");
htmlEditor.setTheme("ace/theme/monokai");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true
});

var cssEditor = ace.edit("css-editor");
cssEditor.setTheme("ace/theme/monokai");
cssEditor.session.setMode("ace/mode/css");
cssEditor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true
});

var jsEditor = ace.edit("js-editor");
jsEditor.setTheme("ace/theme/monokai");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true
});

// JavaScript for the Run button
var runBtn = document.getElementById("run-btn");
runBtn.addEventListener("click", function() {
  var output = document.getElementById("output");
  output.innerHTML = '<style>' + cssEditor.getValue() + '</style>' + htmlEditor.getValue() + '<script>' + jsEditor.getValue() + '</script>';
});

// JavaScript for the Reset button
var resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", function() {
  htmlEditor.setValue("");
  cssEditor.setValue("");
  jsEditor.setValue("");
  var output = document.getElementById("output");
  output.innerHTML = "";
});

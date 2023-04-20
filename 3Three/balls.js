var htmlEditor = ace.edit("html-editor");
htmlEditor.setTheme("ace/theme/github");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});

var cssEditor = ace.edit("css-editor");
cssEditor.setTheme("ace/theme/github");
cssEditor.session.setMode("ace/mode/css");
cssEditor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});

var jsEditor = ace.edit("js-editor");
jsEditor.setTheme("ace/theme/github");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});

function updateOutput() {
  var output = document.getElementById("output").contentWindow.document;
  output.open();
  output.writeln(
    htmlEditor.getValue() +
    "<style>" +
    cssEditor.getValue() +
    "</style>" +
    "<script>" +
    jsEditor.getValue() +
    "</script>"
  );
  output.close();
}

htmlEditor.getSession().on('change', updateOutput);
cssEditor.getSession().on('change', updateOutput);
jsEditor.getSession().on('change', updateOutput);

var themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", function() {
  if (htmlEditor.getTheme() === "ace/theme/github") {
    htmlEditor.setTheme("ace/theme/monokai");
    cssEditor.setTheme("ace/theme/monokai");
    jsEditor.setTheme("ace/theme/monokai");
    document.body.classList.add("monokai");
  } else {
    htmlEditor.setTheme("ace/theme/github");
    cssEditor.setTheme("ace/theme/github");
    jsEditor.setTheme("ace/theme/github");
    document.body.classList.remove("monokai");
  }
});

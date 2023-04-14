    const htmlEditor = document.getElementById("html-editor");
    const cssEditor = document.getElementById("css-editor");
    const jsEditor = document.getElementById("js-editor");
    const output = document.getElementById("output");

    const updateOutput = () => {
      const html = htmlEditor.value;
      const css = `<style>${cssEditor.value}</style>`;
      const js = `<script>${jsEditor.value}</script>`;

      const combinedCode = html + css + js;

      output.contentWindow.document.open();
      output.contentWindow.document.write(combinedCode);
      output.contentWindow.document.close();
    };

    htmlEditor.addEventListener("input", updateOutput);
    cssEditor.addEventListener("input", updateOutput);
    jsEditor.addEventListener("input", updateOutput);

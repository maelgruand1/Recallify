document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const preview = document.getElementById("preview");
    const downloadBtn = document.getElementById("downloadBtn");

    fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        if (file.name.endsWith(".md")) {
            reader.onload = (e) => {
                preview.innerHTML = marked.parse(e.target.result);
                enableDownload(file);
            };
            reader.readAsText(file);
        } 
        else if (file.name.endsWith(".pdf")) {
            reader.onload = async (e) => {
                const typedArray = new Uint8Array(e.target.result);
                const pdf = await pdfjsLib.getDocument(typedArray).promise;
                let text = "";

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    text += content.items.map(item => item.str).join(" ") + "\n";
                }

                preview.innerHTML = `<pre>${text}</pre>`;
                enableDownload(file);
            };
            reader.readAsArrayBuffer(file);
        } 
        else {
            alert("Please select a .md or .pdf file.");
        }
    });

    function enableDownload(file) {
        downloadBtn.style.display = "inline-block";
        downloadBtn.onclick = () => {
            const url = URL.createObjectURL(file);
            const a = document.createElement("a");
            a.href = url;
            a.download = file.name;
            a.click();
        };
    }
});

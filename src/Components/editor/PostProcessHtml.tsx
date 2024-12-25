function postProcessHtml(htmlString : string) {
    // Use DOMParser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Find all <pre> elements and convert them to <code>
    doc.querySelectorAll("pre").forEach((pre) => {
        // Create a new <code> element
        const code = document.createElement("code");
        code.innerHTML = pre.innerHTML; // Copy content

        // Copy attributes if necessary
        Array.from(pre.attributes).forEach((attr) => {
            code.setAttribute(attr.name, attr.value);
        });
        const codeContent = pre.innerHTML;

        const brCount = (codeContent.match(/<br\s*\/?>/g) || []).length;

        let gutterCount = '';
        for (let i = 1; i <= brCount+1; i++) {
            gutterCount += i + '\n';
        }

        code.setAttribute('data-gutter', gutterCount);

        // Replace <pre> with <code>
        pre.replaceWith(code);
    });

    /// replacing pre-wrap to pre in childs of the code element
    doc.querySelectorAll("code").forEach((codeElement) => {
        // Iterate over child elements of <code>
        codeElement.querySelectorAll("[style]").forEach((child) => {
            const style = child.getAttribute("style");
            if (style && style.includes("white-space: pre-wrap;")) {
                const updatedStyle = style.replace("white-space: pre-wrap;", "white-space: pre;");
                child.setAttribute("style", updatedStyle);
            }
        });
    });


    // Serialize the modified DOM back to HTML
    return doc.body.innerHTML;
}

export default postProcessHtml;

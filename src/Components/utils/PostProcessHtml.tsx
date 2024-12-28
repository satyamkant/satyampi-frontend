import { exportToSvg } from "@excalidraw/excalidraw";

async function postProcessHtml (htmlString: string, processSvg: boolean) {
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
        for (let i = 1; i <= brCount + 1; i++) {
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

    if (processSvg) {
        // Select all <span> elements with the `data-lexical-excalidraw-json` attribute
        document.querySelectorAll(
            'span[data-lexical-excalidraw-json]'
        ).forEach(async (span) => {
            const excalidrawData = span.getAttribute("data-lexical-excalidraw-json");
            const removeStyleFromSvg_HACK = (svg: SVGElement) => {
                const styleTag = svg?.firstElementChild?.firstElementChild;

                // Generated SVG is getting double-sized by height and width attributes
                // We want to match the real size of the SVG element
                const viewBox = svg.getAttribute('viewBox');
                if (viewBox != null) {
                    const viewBoxDimensions = viewBox.split(' ');
                    svg.setAttribute('width', viewBoxDimensions[2]);
                    svg.setAttribute('height', viewBoxDimensions[3]);
                }

                if (styleTag && styleTag.tagName === 'style') {
                    styleTag.remove();
                }
            };

            if (excalidrawData) {
                try {
                    // Parse the Excalidraw JSON data
                    const excalidrawState = JSON.parse(excalidrawData);
                
                    const { elements, appState, files } = excalidrawState;


                    const svg: SVGElement = await exportToSvg({
                        appState,
                        elements,
                        files,
                    });
                    removeStyleFromSvg_HACK(svg);
        
                    svg.setAttribute('width', '100%');
                    svg.setAttribute('height', '100%');
                    svg.setAttribute('display', 'block');

                    span.appendChild(svg);
                    span.removeAttribute("data-lexical-excalidraw-json");
                    console.log(svg)
                } catch (error) {
                    console.error("Error processing Excalidraw JSON:", error);
                }
            }
        });
    }
    // Serialize the modified DOM back to HTML
    const outputHtml = doc.body.innerHTML;
    return outputHtml;
}

export default postProcessHtml;

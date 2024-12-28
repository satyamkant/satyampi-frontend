import { $generateHtmlFromNodes } from "@lexical/html";
import { $createParagraphNode, $createTextNode, createEditor } from "lexical";
import postProcessHtml from "./PostProcessHtml";
import PlaygroundNodes from "../editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../editor/themes/PlaygroundEditorTheme";

export const renderEditorStateToHtml = async (serializedState: string) => {
    // Create a temporary editor instance
    const editor = createEditor({
        namespace: "lexical-editor",
        nodes: [...PlaygroundNodes],
        theme: PlaygroundEditorTheme,
        onError: (error: Error) => {
            throw error;
        },
    });
    editor.setEditorState(editor.parseEditorState(serializedState));
    let html = "";
    html = await new Promise((resolve) => {
        editor.update(() => {
            resolve($generateHtmlFromNodes(editor));
        });
    });
    // Post-process the HTML
    try {
        html = await postProcessHtml(html, true);
    } catch (error) {
        console.error("Error during post-processing:", error);
        throw error;
    }

    return html;
};
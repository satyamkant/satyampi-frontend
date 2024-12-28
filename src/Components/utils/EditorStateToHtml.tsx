import { $generateHtmlFromNodes } from "@lexical/html";
import { $createParagraphNode, $createTextNode, createEditor } from "lexical";
import postProcessHtml from "./PostProcessHtml";
import PlaygroundNodes from "../editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../editor/themes/PlaygroundEditorTheme";

export const renderEditorStateToHtml = (serializedState: string) => {
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

    editor.update(() => {
        html = $generateHtmlFromNodes(editor);
    })

    html = postProcessHtml(html,true);
    return html;
};
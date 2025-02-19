import { $generateHtmlFromNodes } from "@lexical/html";
import { $createParagraphNode, $createTextNode, createEditor } from "lexical";
import postProcessHtml from "./PostProcessHtml";
import PlaygroundNodes from "../editor/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "../editor/themes/PlaygroundEditorTheme";

export const serializedStateToEditorState = async (serializedState: string) => {
    // Create a temporary editor instance
    const editor = createEditor({
        namespace: "lexical-editor",
        nodes: [...PlaygroundNodes],
        theme: PlaygroundEditorTheme,
        onError: (error: Error) => {
            throw error;
        },
    });
    return editor.parseEditorState(serializedState);
};
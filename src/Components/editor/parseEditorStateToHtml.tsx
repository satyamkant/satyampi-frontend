import { $generateHtmlFromNodes } from "@lexical/html";
import { createEditor, SerializedEditorState, SerializedLexicalNode } from "lexical";
import postProcessHtml from "./PostProcessHtml";
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import PlaygroundNodes from "./nodes/PlaygroundNodes";

async function parseEditorStateToHtml(jsonData: string | SerializedEditorState<SerializedLexicalNode>) {
    // Create a new Lexical editor instance
    const editor = createEditor({
        theme: PlaygroundEditorTheme,
        // Any custom nodes go here
        nodes: [...PlaygroundNodes]
    });

    // Parse the JSON into an EditorState
    const editorState = editor.parseEditorState(jsonData);

    // Generate HTML
    let htmlString = "";
    editor.setEditorState(editorState);

    editor.update(() => {
        htmlString = $generateHtmlFromNodes(editor, null);
        htmlString = postProcessHtml(htmlString);
        // Convert nodes to HTML
    });

    return htmlString;
}

export default parseEditorStateToHtml;
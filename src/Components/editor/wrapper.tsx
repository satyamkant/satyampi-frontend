import './editor.css'

import { LexicalComposer } from '@lexical/react/LexicalComposer';

import PlaygroundNodes from './nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';



import Editor from "./editor";
import { TableContext } from './plugins/TablePlugin';

export default function MyEditor() {
    const initialConfig = {
        editorState: prepopulatedRichText,
        namespace: "lexical-editor",
        nodes: [...PlaygroundNodes],
        theme: PlaygroundEditorTheme,
        onError: (error: Error) => {
            throw error;
        },
    }

    return (
        <div className="editor-shell">
            <LexicalComposer initialConfig={initialConfig}>
                <TableContext>
                    <Editor />
                </TableContext>
            </LexicalComposer>
        </div>
    )
}




function prepopulatedRichText() {
}


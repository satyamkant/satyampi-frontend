import './editor.css'

import { LexicalComposer } from '@lexical/react/LexicalComposer';

import PlaygroundNodes from './nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';



import Editor, { EditorProps } from "./editor";
import { TableContext } from './plugins/TablePlugin';
import { EditorState } from 'lexical';

export interface MyEditorProps {
    editorState: EditorState;
    blogId: number;
    blogTitle: string;
    description: string;
    blogType: string;
    userId: number;
    userName: string;
    emailId: string;
}


export default function MyEditor(MyEditorProps: MyEditorProps) {
    const initialConfig = {
        editorState: MyEditorProps.editorState,
        namespace: "lexical-editor",
        nodes: [...PlaygroundNodes],
        theme: PlaygroundEditorTheme,
        onError: (error: Error) => {
            throw error;
        },
    }

    const editorProps: EditorProps = {
        blogId: MyEditorProps.blogId,
        blogTitle: MyEditorProps.blogTitle,
        description: MyEditorProps.description,
        blogType:  MyEditorProps.blogType,
        userId: MyEditorProps.userId,
        userName: MyEditorProps.userName,
        emailId: MyEditorProps.emailId,
    }

    return (
        <div className="editor-shell">
            <LexicalComposer initialConfig={initialConfig}>
                <TableContext>
                    <Editor {...editorProps} />
                </TableContext>
            </LexicalComposer>
        </div>
    )
}




function prepopulatedRichText() {
}


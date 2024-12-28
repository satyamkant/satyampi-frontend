import './editor.css'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';

import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ContentEditable from './ui/ContentEditable';
import Placeholder from './ui/Placeholder';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import ExcalidrawPlugin from './plugins/ExcalidrawPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';

import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin';
import TableCellNodes from './nodes/TableCellNodes';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { SetStateAction, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import AuthService from '../Controller/AuthService';
import { renderEditorStateToHtml } from '../utils/EditorStateToHtml';
import data from '../../DAO/editorData.json'
import postProcessHtml from '../utils/PostProcessHtml';

export default function Editor() {
    const [editor] = useLexicalComposerContext();



    const placeholder = <Placeholder>{'Enter some rich text...'}</Placeholder>;
    const [editorState, setEditorState] = useState("null");
    const [html, setHtml] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const cellEditorConfig = {
        namespace: 'Playground',
        nodes: [...TableCellNodes],
        onError: (error: Error) => {
            throw error;
        },
        theme: PlaygroundEditorTheme,
    };

    function OnChangePlugin({ onChange }: { onChange: (editorState: any, editor: any) => void }) {
        useEffect(() => {
            return editor.registerUpdateListener(({ editorState }) => {
                onChange(editorState, editor);
            });
        }, [editor, onChange]);


        return null;
    }


    function onChnageTitle(event: { target: { value: SetStateAction<string>; }; }) {
        setBlogTitle(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();

        const response = await AuthService.SubmitBlogService(blogTitle, editorState);

    };


    function onChange(current: { toJSON: () => any; }, editor: any) {
        const editorState = editor.getEditorState();
        const editorStateJSON = current.toJSON();

        setEditorState(JSON.stringify(editorStateJSON));

        // let htmlString = renderEditorStateToHtml(editor.getEditorState().toJSON());
        let htmlString = "";

        editorState.read(() => {
            htmlString = $generateHtmlFromNodes(editor);
        })
        htmlString = postProcessHtml(htmlString, false)
        setHtml(htmlString);
    }

    return (
        <>
            <div className="card my-3">
                <h5 className="card-header">Editor</h5>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Blog Title</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1"
                            placeholder="Enter Blog Title" onChange={onChnageTitle} />
                    </div>

                    <ToolbarPlugin />
                    <div className="editor-container">
                        <RichTextPlugin
                            contentEditable={
                                <div className="editor-scroller">
                                    <div className="editor">
                                        <ContentEditable />
                                    </div>
                                </div>
                            }
                            placeholder={placeholder}
                            ErrorBoundary={LexicalErrorBoundary}
                        />

                        <TabFocusPlugin />
                        <TabIndentationPlugin />

                        <TablePlugin
                            hasCellMerge={true}
                            hasCellBackgroundColor={true}
                        />
                        <NewTablePlugin cellEditorConfig={cellEditorConfig}>
                            <AutoFocusPlugin />
                            <RichTextPlugin
                                contentEditable={
                                    <ContentEditable className="TableNode__contentEditable" />
                                }
                                placeholder={null}
                                ErrorBoundary={LexicalErrorBoundary}
                            />
                            <HistoryPlugin />
                        </NewTablePlugin>
                        <AutoEmbedPlugin />
                        <ComponentPickerPlugin />
                        <HashtagPlugin />
                        <ExcalidrawPlugin />
                        <EquationsPlugin />
                        <HorizontalRulePlugin />
                        <HistoryPlugin />
                        <AutoFocusPlugin />
                        <LinkPlugin />
                        <ListPlugin />
                        <CheckListPlugin />
                        <MarkdownShortcutPlugin />
                        <CodeHighlightPlugin />
                        <ListMaxIndentLevelPlugin maxDepth={7} />
                        <YouTubePlugin />
                        <FloatingLinkEditorPlugin />
                        <AutoLinkPlugin />
                    </div>
                    {/* <TreeViewPlugin /> */}
                    <OnChangePlugin onChange={onChange} />
                    <button type="button" className="btn btn-success my-2" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className="card">
                <h5 className="card-header">Preview</h5>
                <div className="card-body">
                    <div className="editor-container">
                        <h1 id="blog-title" className="card-title">{blogTitle}</h1>
                        <div className="px-3 py-3" dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                </div>
            </div>
        </>
    )
}

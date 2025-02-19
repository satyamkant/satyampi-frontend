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
import postProcessHtml from '../utils/PostProcessHtml';
import BlogService from '../Controller/BlogService';
import { BlogType } from '../../DAO/Enums';

export interface EditorProps {
    blogId: number;
    blogTitle: string;
    description: string;
    blogType: string;
    userId: number;
    userName: string;
    emailId: string;
}

export default function Editor(editorProps: EditorProps) {

    const placeholder = <Placeholder>{'Enter some rich text...'}</Placeholder>;

    const [editor] = useLexicalComposerContext();
    const [editorState, setEditorState] = useState("null");
    const [html, setHtml] = useState("");
    const [blogTitle, setBlogTitle] = useState(editorProps.blogTitle);
    const [description, setDescription] = useState(editorProps.description);
    const [isContentEmpty, setIsContentEmpty] = useState(false);
    const [blogType, setBlogType] = useState(editorProps.blogType);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

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

    function onCHangeDescription(event: { target: { value: SetStateAction<string>; }; }) {
        setDescription(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (html === `<p class="PlaygroundEditorTheme__paragraph"><br></p>` || html === "") {
            setIsContentEmpty(true);
            return;
        }
        else
            setIsContentEmpty(false);

        setIsSubmitDisabled(true);
        if (editorProps.userId == null) {
            alert("User ID is missing please login again");
            setIsSubmitDisabled(false);
            return;
        }

        if (editorProps.blogTitle === "") {
            BlogService.SubmitBlogService(editorProps.userId, blogTitle, editorState, BlogType[blogType as keyof typeof BlogType], description).then((Response) => {
                if (Response.status === "200 OK")
                    alert("Blog Submitted Successfully");
                else
                    alert("Error in submitting blog Try again");

            }).finally(() => {
                setIsSubmitDisabled(false);
            });
        } else {
            BlogService.UpdateBlogService(editorProps.blogId, blogTitle, editorState, BlogType[blogType as keyof typeof BlogType], description).then((Response) => {
                if (Response.status === "200 OK")
                    alert("Blog Updated Successfully");
                else
                    alert("Error in updating blog Try again");
                console.log(Response);

            }).finally(() => {
                setIsSubmitDisabled(false);
            });
        }
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
        postProcessHtml(htmlString, false).then((processedHtml) => {
            setHtml(processedHtml);
        });
        setHtml(htmlString);

        if (html === `<p class="PlaygroundEditorTheme__paragraph"><br></p>`)
            setIsContentEmpty(true);
        else
            setIsContentEmpty(false);
    }



    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', async event => {
            if (!(form as HTMLFormElement).checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })

    return (
        <>
            <div className="card my-3">
                <h5 className="card-header">Editor</h5>
                <div className="card-body">
                    <div className="mb-3">
                        <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                            <div className="col-md-4">
                                <label htmlFor="validationCustom01" className="form-label"><b>Blog Title</b></label>
                                <input type="text" className="form-control" id="validationCustom01" onChange={onChnageTitle} value={blogTitle} disabled={editorProps.blogTitle !== ""} required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please enter the blog title.
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="validationCustom02" className="form-label"> <b>User Name</b></label>
                                <input type="text" className="form-control" disabled={true} id="validationCustom02" value={editorProps.userName ?? 'Error'} required />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="validationCustomUsername" className="form-label"><b>Email Id</b></label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" disabled={true} value={editorProps.emailId ?? 'Error'} required />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <label htmlFor="validationCustom03" className="form-label"><b>Description</b></label>
                                <textarea className="form-control" id="validationCustom03" rows={1} required onChange={onCHangeDescription} value={description} />
                                <div className="invalid-feedback">
                                    Please provide a valid description.
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="validationCustom04" className="form-label"><b>Blog Type</b></label>
                                <select className="form-select" id="validationCustom04" onChange={(e) => setBlogType(e.target.value)} value={blogType} required>
                                    {Object.values(BlogType).map((type) => (
                                        <option key={type} value={type}>
                                            {type.replace(/_/g, " ")}
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid state.
                                </div>
                            </div>

                            <div>
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
                            </div>
                            {isContentEmpty && <div className="text-danger mt-1" style={{ fontSize: ".875em" }}>Please enter blog content.</div>}


                            <OnChangePlugin onChange={onChange} />

                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                        Agree to terms and conditions
                                    </label>
                                    <div className="invalid-feedback">
                                        You must agree before submitting.
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary" type="submit" disabled={isSubmitDisabled}>Submit form</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <div className="card">
                <h5 className="card-header">Preview</h5>
                <div className="card-body">
                    <div className="editor-container px-3 py-3">
                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label"><b>Blog Title</b></label>
                                <input type="text" className="form-control" value={blogTitle} disabled={true} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label"><b>Blog Description</b></label>
                                <input type="text" className="form-control" value={description} disabled={true} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label"><b>Blog Type</b></label>
                                <input type="text" className="form-control" value={blogType} disabled={true} />
                            </div>
                            <hr />
                            <div className="px-3 py-3" dangerouslySetInnerHTML={{ __html: html }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import BlogService from "../Controller/BlogService";
import { serializedStateToEditorState } from "../utils/SerializedStateToEditorState";
import MyEditor, { MyEditorProps } from "../editor/wrapper";

function EditBlog() {
    const [dashboardData, setDashboardData] = useState<JSX.Element | null>(null);
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long", // "February"
            day: "2-digit",
            hour12: true, // Converts to 12-hour format
        }).format(date);
    };

    const toEditorState = async (editorState: string) => {
        console.log(editorState);
        return await serializedStateToEditorState(editorState);
    }

    const blogDataList = async () => {
        try {
            await BlogService.GetAllBlogs().then((response) => {

                const blogListDashboard = (
                    <div>
                        <h2 style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>All Blogs</h2>
                        <div className="table-responsive small">
                            <table className="table table-striped table-sm" style={{ width: "100%", tableLayout: "fixed" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">UserId</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">User Email</th>
                                        <th scope="col">BLog Title</th>
                                        <th scope="col">Date Published</th>
                                        <th scope="col">Date Updated</th>
                                        <th scope="col">Edit Blog</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {response.data.map((blog: any) => {
                                        return (
                                            <tr key={blog.blogId} style={{ height: "50px" }}>
                                                <td className="align-middle">{blog.authorId}</td>
                                                <td className="align-middle">NULL</td>
                                                <td className="align-middle">NULL</td>
                                                <td className="align-middle">{blog.title}</td>
                                                <td className="align-middle">{formatDate(blog.dateCreated)}</td>
                                                <td className="align-middle">{formatDate(blog.dateUpdated)}</td>
                                                <td className="align-middle"><button type="button" className="btn btn-warning" onClick={() => handleClick(blog)}>Edit</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
                setDashboardData(blogListDashboard);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleClick = (blog: any) => {
        serializedStateToEditorState(blog.content).then((editorState) => {
            const editorProps: MyEditorProps = {
                blogId: blog.blogId,
                editorState: editorState,
                blogTitle: blog?.title as string,
                description: blog?.description as string,
                blogType: blog?.blogType as string,
                userId: blog?.authorId as number,
                userName: blog?.name as string,
                emailId: blog?.email as string,
            }
            setDashboardData(<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"><MyEditor {...editorProps} /></main>)
        }
        );
    }

    useEffect(() => {
        blogDataList();
    }, [])

    if (loading) {
        return (<LoadingScreen />)
    }


    return (
        <div>
            {dashboardData}
        </div>
    )
}

export default EditBlog;
import "./css/BlogHome.css"
import BlogNavbar from "./BlogNavbar";
import BlogPage from "./BlogPage";

function BlogHome() {
    return (
        <div className="blogHome">
            <BlogNavbar/>
            <BlogPage/>
        </div>
    )
}

export default BlogHome;
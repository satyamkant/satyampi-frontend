import "./css/BlogHome.css"
import BlogNavbar from "./BlogNavbar";
import { useParams } from "react-router-dom";
import BlogListPage from "./BlogListPage";

function BlogHome() {
    const formatString = (input: string | undefined): string => {
        return (input || '').trim().toUpperCase().replace(/\s+/g, '-');
    };

    const { navLinkName } = useParams<{ navLinkName: string }>();
    const formattedString = formatString(navLinkName);

    return (
        <div className="blogHome">
            <BlogNavbar />
            <BlogListPage blogType={formattedString} navLinkName={navLinkName || ''} />
        </div>
    )
}

export default BlogHome;
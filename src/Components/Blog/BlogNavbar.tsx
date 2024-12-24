import "./css/BlogNavbar.css"
import {Link} from "react-router-dom";

function BlogNavbar() {
    return (
        <div className="nav-scroller bg-body shadow-sm">
            <nav className="nav py-1" aria-label="Secondary navigation">
                <Link className="nav-link" to="/">Intro</Link>
                <Link className="nav-link" to="/">Codeforces</Link>
                <Link className="nav-link" to="/">Codechef</Link>
                <Link className="nav-link" to="/">Leetcode</Link>
                <Link className="nav-link" to="/">Atcoder</Link>
                <Link className="nav-link" to="/">Graphs</Link>
                <Link className="nav-link" to="/">Trees</Link>
                <Link className="nav-link" to="/">Advanced Data Structures</Link>
                <Link className="nav-link" to="/">Gaming</Link>
            </nav>
        </div>
    );
}

export default BlogNavbar;
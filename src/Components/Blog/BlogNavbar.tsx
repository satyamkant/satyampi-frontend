import "./css/BlogNavbar.css"
import { NavLink } from "react-router-dom";

function BlogNavbar() {
    const links = [
        "intro",
        // "codeforces",
        // "codechef",
        // "leetcode",
        // "atcoder",
        "graphs",
        // "trees",
        "advanced-data-structures",
        "gaming",
    ];

    return (
        <div className="nav-scroller bg-body shadow-sm">
            <nav className="nav py-1" aria-label="Secondary navigation">
                {links.map((link) => (
                    <NavLink
                        key={link}
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                        to={`/blog/${link}`}
                    >
                        {link.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}

export default BlogNavbar;
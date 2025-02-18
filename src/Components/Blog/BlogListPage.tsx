import { useEffect, useState } from "react";
import { BlogCard } from "../BlogCard/BlogCard";
import BlogService from "../Controller/BlogService";
import { BlogType } from "../../DAO/Enums";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { BlogDataDTO } from "../../DAO/BlogDataDTO";
import { useNavigate } from "react-router-dom";

interface BlogListPageProps {
    blogType: string;
    navLinkName: string;
}

function BlogListPage({ blogType, navLinkName }: BlogListPageProps) {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<any[]>([]);
    const navigate = useNavigate();




    const blogDataList = async () => {
        try {
            await BlogService.GetAllBlogsOfType(BlogType[blogType as keyof typeof BlogType]).then((response) => {
                setBlogs(response.data);
            });

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        blogDataList();
    }, [blogType])

    if (loading) {
        return <LoadingScreen />; // Loading state
    }

    // If there's only one blog, navigate to the BlogPage
    if (blogs.length === 1) {
        const blogData = blogs[0];
        navigate(`/blog/${navLinkName}/${blogData.slug}`, { state: { blogDataDto: blogData } });
        return null; // Prevent rendering the BlogCard here since we already navigated
    }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
                {blogs.length === 0 ? (
                    <div className="col py-3" style={{ textAlign: "center" }}>
                        <p>No blogs available.</p>
                    </div>

                ) : (
                    blogs.map((blogData: BlogDataDTO, index) => {
                        return (
                            <div className="col py-3" key={index}>
                                <BlogCard blogData={blogData} navLinkName={navLinkName} />
                            </div>
                        )
                    }
                    )
                )}
            </div>
        </div>
    );
}

export default BlogListPage;
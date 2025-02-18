import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'
import thumbnail from '../../Resources/Images/blogCardThumbnail.avif'
import { BlogDataDTO } from '../../DAO/BlogDataDTO';
import { useNavigate, useParams } from 'react-router-dom';

interface BlogCardProps {
    blogData: BlogDataDTO;
    navLinkName: string;
}

export const BlogCard = ({ blogData , navLinkName}: BlogCardProps) => {

    const navigate = useNavigate();  // Initialize navigate hook

    const handleReadBlog = () => {
        // Navigate to /blog/{blogslug}
        navigate(`/blog/${navLinkName}/${blogData.slug}`, { state: { blogDataDto: blogData } });
    };
    return (
        <CCard style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={thumbnail} />
            <CCardBody>
                <CCardTitle>{blogData.title}</CCardTitle>
                <CCardText>
                    {blogData.description}
                </CCardText>
                <CButton color="primary" onClick={handleReadBlog}>
                    Read Blog
                </CButton>
            </CCardBody>
        </CCard>
    )
}

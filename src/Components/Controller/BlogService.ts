import axios from 'axios'
import { BlogType } from '../../DAO/Enums';
import { BlogDataDTO } from '../../DAO/BlogDataDTO';

const API_BASE_URL = 'http://localhost:2000'; // Replace with your backend URL
// const API_BASE_URL = 'https://blogsecurity.satyampi.uk';


// Configure Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Include cookies for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

function toSlug(title: string): string {
  // Convert to lowercase
  let slug = title.toLowerCase();

  // Remove special characters (e.g., accents) using Unicode normalization
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove diacritical marks

  // Replace spaces and special characters with dashes
  slug = slug.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  // Remove leading/trailing dashes
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}

const BlogService = {
    SubmitBlogService: async (authorId: number,title: string, editorState: string,blogType: BlogType,description: string) => {
        
        const blogDataDTO: BlogDataDTO = {
            blogType: blogType,
            description: description,
            title: title,
            slug: toSlug(title),
            dateCreated: null,
            dateUpdated: null,
            authorId: authorId,
            content: editorState,
            imageUrls: null,
            publishedStatus: false
        }

        try {
            const response = await axiosInstance.post("/security/blog/saveBlog", blogDataDTO, {});
            return response.data;
        } catch (error: any) {
            return error.response;
        }
    },

    UpdateBlogService: async (blogId: number, title: string, editorState: string, blogType: BlogType, description: string) => {
        const blogDataDTO: BlogDataDTO = {
            blogId: blogId,
            blogType: blogType,
            description: description,   
            title: title,
            slug: toSlug(title),
            dateCreated: null,
            dateUpdated: null,
            authorId: 0,
            content: editorState,
            imageUrls: null,
            publishedStatus: false
        }

        try {
            const response = await axiosInstance.post(`/security/blog/updateblog`, blogDataDTO, {});
            return response.data;
        } catch (error: any) {
            return error.response;
        }
    },

    GetBlogByTitle: async (title: string) => {
        try {
            const response = await axiosInstance.get(`/security/blog/getBlogByTitle/${title}`, {});
            return response.data;
        } catch (error: any) {
            return error.response;
        }
    },

    GetAllBlogsOfType: async (blogType: BlogType) => {
        try{
            const response = await axiosInstance.get(`/security/blog/getBlogsByType/${blogType}`, {});
            return response.data;
        } catch (error: any) {
            return error.response;
        }
    },

    GetAllBlogs: async () => {
        try{
            const response = await axiosInstance.get(`/security/blog/getAllBlogs`, {});
            return response.data;
        } catch (error: any) {
            return error.response;
        }
    }
}

export default BlogService;
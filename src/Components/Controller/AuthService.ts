import axios from 'axios'
import { BlogType } from '../../DAO/Enums';
import { BlogDataDTO } from '../../DAO/BlogDataDTO';

// const API_BASE_URL = 'http://localhost:2000'; // Replace with your backend URL
const API_BASE_URL = 'https://blogsecurity.satyampi.uk';


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

const AuthService = {
     LoginService : async (email : string, password : string) => {
        // Create the JSON object
        const requestData = {
            email: email,
            passwordHash: password
        };

        try {
            // Send POST request with the JSON body
            // Return the response data
            return await axiosInstance.post("/security/login", requestData, {});
        } catch (error : any) {
            return error.response;
        }
    },

    LogoutService : async () => {
        try{
            const response = await axiosInstance.get("/security/logout", {});
            return response.data;
        }catch(error : any){
            return error.response;
        }
    },

    AdminTestService : async () => {
        try {
            // Send POST request with the JSON body
            const response = await axiosInstance.get("/security/admin", {
            });

            // Return the response data
            return response.data;
        } catch (error : any) {
            return error.response;
        }
    },

    IsAuthenticatedService : async () =>{
         try{
             const response = await axiosInstance.get("/security/isAuthenticated", {
             });
             return response.data;
         }catch(error : any){
             return error.response;
         }
    },

    SubmitBlogService: async (title: string, editorState: string) => {
        
        const blogDataDTO : BlogDataDTO = {
            blogType: BlogType.INTRO,
            title: title,
            slug: toSlug(title),
            dateCreated: null,
            dateUpdated: null,
            authorId: 1,
            content: editorState,
            imageUrls: null,
            publishedStatus: true
        }

        console.log(blogDataDTO);

        try {
            const response = await axiosInstance.post("/security/blog/saveBlog", blogDataDTO, {});
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

}

export default AuthService;
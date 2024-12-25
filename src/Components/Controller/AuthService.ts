import axios from 'axios'

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
    }

}

export default AuthService;
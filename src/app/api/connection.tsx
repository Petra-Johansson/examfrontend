import axios, {AxiosError} from 'axios';

const BASE = 'http://localhost:8080';

export const userLogin = async (credentials: {email:string; password:string }) => {
    try  {
        const res = await axios.post(`${BASE}/authentication/login`, credentials);
        return res.data; 
    } catch(error) {
        if(axios.isAxiosError(error)){
            if(error.response){
            throw new Error(error.response.data.message || 'Something went wrong');
        } else{  
            throw new Error('Network error: try again');
        }
    }
        else{
            throw new Error('Oops something went wrong');
        }
    }
};
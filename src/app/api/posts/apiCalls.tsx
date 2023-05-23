import axios, {AxiosError} from 'axios';

const BASE = 'http://localhost:8080';

export const getPosts = async() =>{
    try {
        const res = await  axios.get(`${BASE}/posts`);
       console.log(res.data)
        return res.data.post;
    } catch(error){
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
}
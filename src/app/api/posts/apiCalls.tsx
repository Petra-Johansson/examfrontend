import axios, {AxiosError} from 'axios';

const BASE = 'http://localhost:8080';

export const getPosts = async () =>{
    try {
        const posts = await axios.get(`${BASE}/post`);
     
        return posts.data;
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

export const addPost = async ()=> {

}

export const getOnePost=()=>{

}
export const deletePost=()=>{

}

export const updatePost=()=>{

}
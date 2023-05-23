import axios, {AxiosError} from 'axios';

const BASE = 'http://localhost:8080';

export const userLogin = async (credentials: {email:string; password:string }) => {
    try  {
        const res = await axios.post(`${BASE}/authentication/login`, credentials);
        const token = res.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log(res.data)
        return res.data.user; 
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

export const fetchUsers = async() =>{
try{ 
    const res = await axios.get(`${BASE}/users`);
return res.data.users;
}  catch(error) {
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
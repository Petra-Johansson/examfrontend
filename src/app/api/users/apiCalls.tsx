import axios, {AxiosError} from 'axios';

const BASE = 'http://localhost:8080';


export const userLogin = async (credentials: { email: string; password: string }) => {
    try {
        const { email, password } = credentials;
        const res = await axios.post(`${BASE}/authentication/login`, { email, password }, { withCredentials: true });
        console.log('response:', res)
        /*const token = res.data.token;
        if (res.headers && res.headers['token']) {
              // Get the 'token' cookie from the response headers
              const token = res.headers['token'][0].split(';')[0].split('=')[1];
        */
        if (res.data && res.data.user && res.data.user.token) {
            const token = res.data.user.token;
            // Set the 'Authorization' header with the token for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return res.data.user;
        } else {
            throw new Error('Token cookie not found in response headers');
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data.errors) {
          const { email, password } = error.response.data.errors;
          throw new Error(email || password);
        }
        throw new Error('Oops, something went wrong');
      }
};
export const getProfile = async () => {
    try {
        const response = await axios.get(`${BASE}/authentication/user`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Oh no, we faild to fetch your profile');
    }
};

export const userLogOut = () => {
    try {
        axios.post(`${BASE}/authentication/logout`)
    } catch (error) {
        throw new Error("Oops something went wrong")
    }
}

export const signupUser = async (credentials: { email: string; password: string, name: string, phone: string, image: string, contractNo: string }) => {

    try {
        const { email, name, phone, contractNo, image, password } = credentials;

        if (!email || !name || !phone || !contractNo || !password) {
            throw new Error('Something is missing')
        }

        const res = await axios.post(`${BASE}/users`)
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Something went wrong');
            } else {
                throw new Error('Network error: try again');
            }
        }
        else {
            console.log(error)
            throw new Error('Oops something went wrong');
        }
    }

};


export const getUsers = async () => {
    try {
        const users = await axios.get(`${BASE}/users`);
        return users.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Something went wrong');
            } else {
                throw new Error('Network error: try again');
            }
        }
        else {
            throw new Error('Oops something went wrong');
        }

    }
}

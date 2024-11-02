import axios from "axios";
import { getItem } from "../common/storage.services";

const baseURL = import.meta.env.VITE_BASE_URL;


const instance = new axios.create({
    baseURL: baseURL,
});

const onSuccess = (response) => {
    return response.data;
};
const onError = (err) => {
    console.log(err);

    if (err.response.status === 401) {
        // remove the token from the storage
        window.location.pathname = '/login';  // or "/"
    }

    if (err.response.status >= 400 && err.response.status < 500) {
        alert('client error: ' + err.response.status);
    }

    return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess, onError);
instance.interceptors.request.use((opt) => {

    const token = getItem("Token");

    if (token) opt.headers.Authorization = "Bearer " + token ;

    return opt;
});


export default instance
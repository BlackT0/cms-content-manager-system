import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8888/cms/api/v1.0';

axios.interceptors.request.use(config => {
    let token = window.sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }

    return config
})


export default axios;
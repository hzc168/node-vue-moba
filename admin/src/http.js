import axios from 'axios'
import Vue from 'vue'
import router from './router'

let http = axios.create({
    baseURL: process.env.VUE_API_URL || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api',
});

http.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
})

http.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response.data.message) {
        console.log("错误信息", err.response);
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        });

        if (err.response.status === 401) {
            router.push('/login');
        }
    }
    return Promise.reject(err);
})

export default http;

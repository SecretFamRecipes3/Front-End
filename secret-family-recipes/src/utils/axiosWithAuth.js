import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: 'http://hsmm-secretfamilyrecipe.herokuapp.com'
    });
};
import axios from 'axios';

export const axiosWithAuth = () => {
    // const token = localStorage.getItem('token');
    const token = `Basic ${btoa('lambda-client:lambda-secret')}`;

    return axios.create({
        headers: {
            // btoa is converting our client id/client secret into base64
            // Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
            Authorization: token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        baseURL: 'http://hsmm-secretfamilyrecipe.herokuapp.com'
    });
};
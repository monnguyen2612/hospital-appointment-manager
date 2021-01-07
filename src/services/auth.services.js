import { BASE_URL } from '../variables/values';
import axios from 'axios';
export async function login(email, password) {
    return fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            password: password,
            email : email
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Wrong Email Or Password');
        }
    }).catch(e=> {throw e});
}
export function validateToken() {
    return axios.post(`${BASE_URL}auth/validate-token`, '', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(e => {
        localStorage.removeItem('authToken');
        throw e;
    });
}
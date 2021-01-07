import axios from 'axios';
import { BASE_URL } from 'variables/values';

export function getMyPrescriptions(pageNo) {
    return axios.get(`${BASE_URL}patient/get-my-prescriptions/${pageNo}`, {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(e => { throw e });
}
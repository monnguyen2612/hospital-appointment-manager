import axios from 'axios';
import { BASE_URL } from 'variables/values';

export function getPatient(patient) {
    return axios.post(`${BASE_URL}pharmacist/get-patient`, patient, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(e => {
        throw e;
    });
}

export function getPrescriptionByPatient(patientId) {
    return axios.get(`${BASE_URL}pharmacist/get-prescription/${patientId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(e => {
        throw e;
    })
}
import axios from 'axios';
import { BASE_URL } from 'variables/values';

export function loginToPatientProfile(credentials) {
    return axios.post(`${BASE_URL}doctor/get-patient-by-email`, {
        id: credentials.id,
    }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error;
    });
}

export function addPrescription(prescription) {
    return axios.post(`${BASE_URL}doctor/prescription`, prescription, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        throw err
    });
}

export function getMyPrescription() {
    return axios.get(`${BASE_URL}doctor/my-prescriptions`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        throw err
    });
}

export function deletePrescription(prescriptionId) {
    return axios.delete(`${BASE_URL}doctor/delete-prescription/${prescriptionId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        return response.data;
    }).catch(e => { throw e });
}

export function getPrescriptionByPatient(patientId) {
    return axios.get(`${BASE_URL}doctor/old-prescription/${patientId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(err => {
        throw err;
    });
}

export function getPrescriptionById(prescriptionId) {
    return axios.get(`${BASE_URL}doctor/get-prescription-by-id/${prescriptionId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(err => {
        throw err;
    });
}

export function updatePrescription(prescription) {
    return axios.patch(`${BASE_URL}doctor/update-prescription`, prescription, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(e => {
        throw e
    });
}
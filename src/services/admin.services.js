import { BASE_URL } from "variables/values";
import axios from 'axios';
export async function getAllDoctors(pageNo) {
    return fetch(`https://falling-feather-5264.getsandbox.com/doctors`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else
            throw new Error('Some Thing Went Wrong');
    }).catch(e => console.log(e));
}

export async function addDoctor(fullName, email, address, specialities , gender , regNumber , telNumber) {
    return fetch(`https://falling-feather-5264.getsandbox.com/doctors`, {
        method: 'POST',
        body: JSON.stringify({
            id: Math.random().toString(36).substr(2, 9),
            email: email,
            role: 2,
            fullName: fullName,
            telNumber: telNumber,
            gender: gender,
            specialities: specialities,
            regNumber: regNumber,
            address: address
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Unauthorized User');
        } else if (response.status === 409) {
            throw new Error('This User Exists');
        } else
            throw new Error('Something Went Wrong');
    }).catch(err => { throw err });
}

export async function deleteUser(id , role) {
    return fetch(`https://falling-feather-5264.getsandbox.com/doctors/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Unauthorized User');
        } else
            throw new Error('Something Went Wrong');
    }).catch(e => { throw e });
}

export async function deleteSpecialized(id , role) {
    return fetch(`https://falling-feather-5264.getsandbox.com:443/specializeds/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Unauthorized User');
        } else
            throw new Error('Something Went Wrong');
    }).catch(e => { throw e });
}

export async function getPagesCount() {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Unauthorized User');
        } else if (response.status === 409) {
            throw new Error('This User Exists');
        } else
            throw new Error('Something Went Wrong');
        
    }).catch(err => { throw err });
}

export async function getAllPatients(pageNo) {
    return fetch(`https://bold-wildflower-7075.getsandbox.com/patients`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401)
            throw new Error('Unauthorized');
        else
            throw new Error('Something Went Wrong');
    }).catch(e => {
        throw e;
    })
}

export async function addNewPatient(patient) {
    
    return fetch(`https://bold-wildflower-7075.getsandbox.com/patient`, {
        method: 'POST',
        body: JSON.stringify({
            fullName: patient.fullName,
            role: 3,
            nic: patient.nic,
            email: patient.email,
            gender: patient.gender,
            dob: patient.dob,
            telNumber: patient.telNumber,
            address : patient.address
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401)
            throw new Error('UNAUTHORIZED');
        else if (response.status === 409)
            throw new Error('This Email Exists');
        else if (response.status === 400)
            throw new Error('Please Check All Fileds');
        else
            throw new Error('Something Went Wrong');
    }).catch(e => {
        throw e;
    })
}
export async function addNewHospital(newHospital){
    return fetch(`https://falling-feather-5264.getsandbox.com:443/hospitals`, {
        method: 'POST',
        body: JSON.stringify({
            id: Math.random().toString(36).substr(2, 9),
            fullName: newHospital.fullName,
            specializeds: newHospital.specializeds,
            address: newHospital.address,
            image: newHospital.image,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401)
            throw new Error('UNAUTHORIZED');
        else if (response.status === 409)
            throw new Error('This Email Exists');
        else if (response.status === 400)
            throw new Error('Please Check All Fileds');
        else
            throw new Error('Something Went Wrong');
    }).catch(e => {
        throw e;
    })
}

export async function fetchAllPharmacists(pageNo) {
    return fetch(`https://falling-feather-5264.getsandbox.com:443/specializeds`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Unauthorized User');
        }
        else
            throw new Error('Something Went Wrong');
    }).catch(e => {
        throw e;
    });
}

export async function addNewPharmacist(pharmacist) {
    return fetch(`https://falling-feather-5264.getsandbox.com:443/specializeds`, {
        method: 'POST',
        body: JSON.stringify({
            id: Math.random().toString(36).substr(2, 9),
            fullName: pharmacist.fullName,
            hospitals: pharmacist.hospitals
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401)
            throw new Error('UNAUTHORIZED');
        else if (response.status === 409)
            throw new Error('This Email Exists');
        else if (response.status === 400)
            throw new Error('Please Check All Fileds');
        else
            throw new Error('Something Went Wrong');
    }).catch(e => {
        throw e;
    })
}

export async function getAllStaffMembers(pageNo) {
    return fetch(`${BASE_URL}admin/get-staff-members/${pageNo}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Unauthorized User');
        } else
            throw new Error('Something Went Wrong');
    }).catch(e => {
        throw e;
    })
}

export async function getAllHospitals(pageNo) {
    return fetch(`https://falling-feather-5264.getsandbox.com:443/hospitals`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401) {
            localStorage.removeItem('authToken');
            throw new Error('Unauthorized User');
        } else
            throw new Error('Something Went Wrong');
    }).catch(e => {
        throw e;
    })
}

export async function addNewStaffMember(staffMember) {
    return fetch(`${BASE_URL}admin/add-new-staff-member`, {
        method: 'POST',
        body: JSON.stringify({
            fullName: staffMember.fullName,
            role: 5,
            email: staffMember.email,
            gender: staffMember.gender,
            dob: staffMember.dob,
            telNumber: staffMember.telNumber,
            address: staffMember.address,
            jobRole: staffMember.jobRole
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else if (response.status === 401)
            throw new Error('UNAUTHORIZED');
        else if (response.status === 409)
            throw new Error('This Email Exists');
        else if (response.status === 400)
            throw new Error('Please Check All Fileds');
        else
            throw new Error('Something Went Wrong');
    }).catch(e => {
        throw e;
    });
}
export function getById(role, id) {
    return fetch(`https://falling-feather-5264.getsandbox.com:443/doctors/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => {
        return response.json()}).catch(e => {
        throw e;
    })
}

export function updateDoctor(doctor) {
    return axios.put(`https://falling-feather-5264.getsandbox.com:443/doctors/${doctor.id}`, doctor, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(e => {
        throw e;
    });
}

export function updatePatient(patient) {
    return axios.patch(`${BASE_URL}admin/update-patient`, patient, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(e => { throw e });
}

export function updatePharmacist(pharmacist) {
    return axios.patch(`${BASE_URL}admin/update-pharmacist`, pharmacist, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(err => {
        throw err
    });
}

export function updateStaffMember(staffMember) {
    return axios.patch(`${BASE_URL}admin/update-staff-member`, staffMember, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(response => response.data).catch(err => {
        throw err
    });
}
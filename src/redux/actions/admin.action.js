import { FETCH_DOCTORS , FETCH_PATIENTS , FETCH_PHARMACISTS } from "redux/actiontypes/actiontypes";
import { FETCH_STAFF_MEMBERS } from "redux/actiontypes/actiontypes";


export function fetchDoctors(doctorList) {
    return dispatch => {
        dispatch(asyncFetchDoctors(doctorList))
    }
}

export const asyncFetchDoctors = (doctorList) => ({
    type: FETCH_DOCTORS,
    doctorsList: doctorList
});

export function fetchPatients(response) {
    return dispatch => {
        dispatch(asyncFetchPatients(response))
    }
}

export const asyncFetchPatients = (response) => ({
    type: FETCH_PATIENTS,
    patientResponse: response
});

export function fetchPharmacists(response) {
    return dispatch => {
        dispatch(asyncFetchPharmacists(response))
    }
}

export const asyncFetchPharmacists = (response) => ({
    type: FETCH_PHARMACISTS,
    pharmacistsResponse : response
});

export const asyncFetchStaffMembers = (response) => ({
    type: FETCH_STAFF_MEMBERS,
    staffMambersResponse : response
});

export function fetchStaffMembers(response) {
    return dispatch => {
        dispatch(asyncFetchStaffMembers(response))
    }
}
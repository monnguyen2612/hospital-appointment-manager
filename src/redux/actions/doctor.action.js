import { LOGIN_TO_PATIENT , GET_MY_PRESCRIPTIONS } from "../actiontypes/actiontypes";


export function loginToPatient(patientResponse) {
    return dispatch => {
        dispatch(asyncLoginToPatient(patientResponse))
    }
}
export const asyncLoginToPatient = (patient) => ({
    type: LOGIN_TO_PATIENT,
    patient : patient
});

export function getMyPrescriptions(prescriptions) {
    return dispatch => {
        dispatch(asyncGetMyPrescriptions(prescriptions))
    }
}

export const asyncGetMyPrescriptions = (prescriptions) => ({
    type: GET_MY_PRESCRIPTIONS,
    prescriptions: prescriptions
});
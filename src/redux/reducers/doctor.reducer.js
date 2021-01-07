import { LOGIN_TO_PATIENT , GET_MY_PRESCRIPTIONS } from '../actiontypes/actiontypes';
let initialState = {
    patient: null,
    prescriptions: [],
    pages : 0
}
export const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_TO_PATIENT:
            state.patient = action.patient;
            return { ...state };
        case GET_MY_PRESCRIPTIONS:
            state.prescriptions = action.prescriptions;
            return { ...state };
        default:
            return state
    }
}
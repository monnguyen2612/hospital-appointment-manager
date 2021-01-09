import { FETCH_DOCTORS, FETCH_PATIENTS , FETCH_PHARMACISTS, FETCH_STAFF_MEMBERS, FETCH_HOSPITALS } from "../actiontypes/actiontypes";

const initialState = {
    doctors: [],
    pages: 0,
    patientList: [],
    patientPages: 0,
    pharmacistList: [],
    pharmacistsPages: 0,
    staffMembers: [],
    staffMembersPages : 0,
    hospitals: [],
}
export const adminReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case FETCH_DOCTORS:
            state.doctors = action.doctorsList;
            state.pages = action.doctorsList.pages;
            return { ...state }
        case FETCH_PATIENTS:
            state.patientList = action.patientResponse;
            state.patientPages = action.patientResponse.pages;
            return { ...state }
        case FETCH_PHARMACISTS:
            state.pharmacistList = action.pharmacistsResponse;
            state.pharmacistsPages = action.pharmacistsResponse.pages;
            return { ...state }
        case FETCH_STAFF_MEMBERS:
            state.staffMembers = action.staffMambersResponse.members;
            state.staffMembersPages = action.staffMambersResponse.pages;
            return {...state}
        case FETCH_HOSPITALS:
            state.hospitals = action.hospitalsResponse;
            state.hospitalsPages = action.hospitalsResponse.pages;
            return {...state}
        default:
            return state
    }
}
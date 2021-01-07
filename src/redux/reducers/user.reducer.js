import { LOGIN } from '../actiontypes/actiontypes';
let user = {
    user: null,
}

export const userReducer = (state = user, action) => {
    switch (action.type) {
        case LOGIN:
            return state
        default:
            return state
    }
}
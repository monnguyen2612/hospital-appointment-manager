import { LOGIN } from '../actiontypes/actiontypes';
export const loginUser = (user) => {
    return dispatch => {
        dispatch(asyncLoginUser(user))
    }
}

export const asyncLoginUser = (user) => ({
    type: LOGIN,
    user: user,
})
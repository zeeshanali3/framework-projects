import {LOGOUT_CURRENT_USER} from '../../ActionTypes/ApiActionTypes';
import {REDUX_LOGOUT_CURRENT_USER} from '../../ActionTypes/ReduxActionTypes';
export const logoutUser = () => {
    return {
        type: LOGOUT_CURRENT_USER,
        payload:
        {
            reduxActionType: REDUX_LOGOUT_CURRENT_USER,
            data:{}
        }
    }
}
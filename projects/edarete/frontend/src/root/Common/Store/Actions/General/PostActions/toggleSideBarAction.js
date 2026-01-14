import { TOGGLE_SIDEBAR } from '../../ActionTypes/ApiActionTypes';

export const toggleSidebarAction = (payload) => {
    return {
        type: TOGGLE_SIDEBAR,
        payload: payload
    }
}
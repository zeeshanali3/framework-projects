import { SIDEBAR_DATA,ACTIVE_TAB } from "../../ActionTypes/ApiActionTypes";

export const sideBarDataAction = (payload) => {

    return {
        type: SIDEBAR_DATA,
        payload: payload
    }
}
export const sideBarActiveTabAction = (ComponentName,ComponentId) => {
    return {
        type: ACTIVE_TAB,
        payload: {
            ComponentName,
            ComponentId
        }
    }
}
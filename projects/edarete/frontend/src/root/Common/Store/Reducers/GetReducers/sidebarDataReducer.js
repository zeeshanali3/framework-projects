import { SIDEBAR_DATA, ACTIVE_TAB } from "../../Actions/ActionTypes/ApiActionTypes"; 
const initialState = {
    sideBarData: [],
    ActiveTab:""
};
export default function sideBarDataReducer(state = initialState, action) {
    switch (action.type) {
        case SIDEBAR_DATA:
            return {
                ...state,
                sideBarData: action?.payload,
            };
        case ACTIVE_TAB:
            return {
                ...state,
                ActiveTab: action?.payload,
            };
        default:
            return state;
    }
}
import { TOGGLE_SIDEBAR } from "../../Actions/ActionTypes/ApiActionTypes"; 
const initialState = {
    isSideBarOpen: true,
};
export default function toggleSidebarReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSideBarOpen: action?.payload,
            };
        default:
            return state;
    }
}
import { IS_LOADING } from "../../Actions/ActionTypes/ApiActionTypes"; 
const initialState = {
    isLoading: false,
};
export default function isLoadingReducer(state = initialState, action) {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: action?.payload,
            };
        default:
            return state;
    }
}
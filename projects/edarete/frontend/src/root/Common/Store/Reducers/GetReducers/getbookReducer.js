import { GETBOOKS ,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    getbookData:[]
}
export default function GetbookReducer(state =initialState,action){
    switch (action.type){
        case GETBOOKS:
            return{
                ...state,
                getbookData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
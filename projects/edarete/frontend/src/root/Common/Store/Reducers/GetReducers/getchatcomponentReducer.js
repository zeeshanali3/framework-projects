import { GETCHATS,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    getchatData:[]
}
export default function GetchatReducer(state =initialState,action){
    switch (action.type){
        case GETCHATS:
            return{
                ...state,
                getchatData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
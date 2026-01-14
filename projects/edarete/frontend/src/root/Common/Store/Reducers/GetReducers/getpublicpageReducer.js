import { ADMINGETPUBLICPAGE,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";


const initialState={
    publicpage:[]
}
export default function GetpublicpageReducer(state =initialState,action){
    switch (action.type){
        case ADMINGETPUBLICPAGE:
            return{
                ...state,
                publicpage: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
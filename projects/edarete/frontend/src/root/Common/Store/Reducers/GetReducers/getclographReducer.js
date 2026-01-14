import { GETCLOGRAPH ,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    getclographData:[]
}
export default function GetCloGraphReducer(state =initialState,action){
    switch (action.type){
        case GETCLOGRAPH:
            return{
                ...state,
                getclographData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
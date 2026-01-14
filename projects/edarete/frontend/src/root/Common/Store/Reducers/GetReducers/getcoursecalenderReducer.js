import { GETCOURSECALENDER ,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    coursetimetablebyIdData:[]
}
export default function GetcoursecalenderReducer(state =initialState,action){
    switch (action.type){
        case GETCOURSECALENDER:
            return{
                ...state,
                coursetimetablebyIdData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
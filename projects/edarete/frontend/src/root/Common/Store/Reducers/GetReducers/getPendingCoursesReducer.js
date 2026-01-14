// 
import { GETPENDINGCOURSES,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";


const initialState={
    getpendingcourses:[]
}
export default function GetPendingCoursesReducer(state =initialState,action){
    switch (action.type){
        case GETPENDINGCOURSES:
            return{
                ...state,
                getpendingcourses: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
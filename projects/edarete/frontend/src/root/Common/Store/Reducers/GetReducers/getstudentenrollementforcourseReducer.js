// GETSTUDENTENROLLEMENTFORCOURSE
import { GETSTUDENTENROLLEMENTFORCOURSE ,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    getcourseenrollementData:[]
}
export default function GetstudentenrollmentforcourseReducer(state =initialState,action){
    switch (action.type){
        case GETSTUDENTENROLLEMENTFORCOURSE:
            return{
                ...state,
                getcourseenrollementData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
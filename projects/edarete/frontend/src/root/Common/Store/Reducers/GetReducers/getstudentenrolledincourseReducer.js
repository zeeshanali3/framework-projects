import { GETSTUDENTENRTOLLEDINCOURSE,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    getstudentincourseData:[]
}
export default function GetstudentenrolledincourseReducer(state =initialState,action){
    switch (action.type){
        case GETSTUDENTENRTOLLEDINCOURSE:
            return{
                ...state,
                getstudentincourseData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
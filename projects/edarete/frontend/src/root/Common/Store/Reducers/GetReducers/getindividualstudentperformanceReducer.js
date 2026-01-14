// 
import { GETINDIVIDUALSTUDENTPERFORMANCE,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";


const initialState={
    getindividuastudentperformance:[]
}
export default function GetIndividualStudentPerformanceReducer(state =initialState,action){
    switch (action.type){
        case GETINDIVIDUALSTUDENTPERFORMANCE:
            return{
                ...state,
                getindividuastudentperformance: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
import { ADMINGETSTUDENTATTENDANCE,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";


const initialState={
    studentattendanceData:[]
}
export default function GetstudentattendanceReducer(state =initialState,action){
    switch (action.type){
        case ADMINGETSTUDENTATTENDANCE:
            return{
                ...state,
                studentattendanceData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
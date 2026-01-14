import { GETCOURSESTUDENTENROLLED,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";


const initialState={
    getcoursestudentenrolledData:[]
}
export default function GetcoursestudentenrolledReducer(state =initialState,action){
    switch (action.type){
        case GETCOURSESTUDENTENROLLED:
            return{
                ...state,
                getcoursestudentenrolledData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
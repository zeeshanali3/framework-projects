import { GETSTUDENTMARKS ,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    getstudentMarksData:[]
}
export default function GetstudentMarksReducer(state =initialState,action){
    switch (action.type){
        case GETSTUDENTMARKS:
            return{
                ...state,
                getstudentMarksData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
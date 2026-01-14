import { GETSTUDENTBYCOURSE ,LOGOUT} from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    getstudentcoursedata:[]
}
export default function GetStudentByCourseReducer(state =initialState,action){
    switch (action.type){
        case GETSTUDENTBYCOURSE:
            return{
                ...state,
                getstudentcoursedata: action?.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
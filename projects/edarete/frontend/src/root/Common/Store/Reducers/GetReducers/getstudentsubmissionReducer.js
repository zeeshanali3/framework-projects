import { GETSTUDENTSUBMISSION ,LOGOUT} from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    getstudentsubmissionData:[]
}
export default function GetstudentsubmissionReducer(state =initialState,action){
    switch (action.type){
        case GETSTUDENTSUBMISSION:
            return{
                ...state,
                getstudentsubmissionData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
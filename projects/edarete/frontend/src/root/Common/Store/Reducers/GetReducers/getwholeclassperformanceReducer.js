import { GETWHOLECLASSPERFORMANCE ,LOGOUT} from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    wholeclassperformanceData:[]
}
export default function GetWholeClassPerformanceReducer(state =initialState,action){
    switch (action.type){
        case GETWHOLECLASSPERFORMANCE:
            return{
                ...state,
                wholeclassperformanceData: action?.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
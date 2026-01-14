import { GETSTUDENTSUBATTACHMENTS ,LOGOUT} from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    studentsubattachData:[]
}
export default function GetstudentsubattachmentReducer(state =initialState,action){
    switch (action.type){
        case GETSTUDENTSUBATTACHMENTS:
            return{
                ...state,
                studentsubattachData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
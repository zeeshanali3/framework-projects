import { GETSUBATTACHMENTS ,LOGOUT} from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    getAllStudentSubmissions:[]
}
export default function GetsubattachmentReducer(state =initialState,action){
    switch (action.type){
        case GETSUBATTACHMENTS:
            return{
                ...state,
                getAllStudentSubmissions: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
import { GETCLOS ,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    getclosData:[]
}
export default function GetclosReducer(state =initialState,action){
    switch (action.type){
        case GETCLOS:
            return{
                ...state,
                getclosData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
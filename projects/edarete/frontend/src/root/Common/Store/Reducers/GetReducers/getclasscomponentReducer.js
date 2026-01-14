import { GETCLASSCOMPONENT ,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    getclasscomponentData:[]
}
export default function GetclasscomponentReducer(state =initialState,action){
    switch (action.type){
        case GETCLASSCOMPONENT:
            return{
                ...state,
                getclasscomponentData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
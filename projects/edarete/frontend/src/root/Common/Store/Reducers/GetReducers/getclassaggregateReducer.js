import { GETCLASSAGGREGATE,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    classaggregate:[]
}
export default function GetClassAggregateReducer(state =initialState,action){
    switch (action.type){
        case GETCLASSAGGREGATE:
            return{
                ...state,
                classaggregate: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
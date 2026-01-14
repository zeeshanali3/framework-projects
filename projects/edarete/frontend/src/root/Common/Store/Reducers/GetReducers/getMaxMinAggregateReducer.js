import { REDUX_MAX_MIN_AGGREGATE ,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    MaxMinAggregate:[]
}
export default function MaxMinAggregate(state =initialState,action){
    switch (action.type){
        case REDUX_MAX_MIN_AGGREGATE:
            return{
                ...state,
                MaxMinAggregate: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
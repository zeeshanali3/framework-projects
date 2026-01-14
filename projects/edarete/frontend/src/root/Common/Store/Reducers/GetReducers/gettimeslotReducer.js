import { ADMINGETTIMESLOT ,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    timeslotData:[]
}

export default function GettimeslotReducer(state=initialState,action){
    switch (action.type){
        case ADMINGETTIMESLOT:
            return{
                ...state,
                timeslotData: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
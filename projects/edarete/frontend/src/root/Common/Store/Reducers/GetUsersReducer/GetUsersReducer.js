import GETUSERS from "../../Actions/GetusersAction/ActionTypes/ReducerType";
const initialState={
    getalluserData:[]
}

export default function GetUserRedcuer(state=initialState,action){
    switch (action.type){
        case GETUSERS:return{
            ...state,
            getalluserData: action.payload,
        };
        default:
            return state;
    }
}
import { UPDATESTUDENTMARKS } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    updatestudentmarks:[]
}
export default function UpdatestudentmarksReducer(state =initialState,action){
    switch (action.type){
        case UPDATESTUDENTMARKS:
            return{
                ...state,
                updatestudentmarks: action.payload,
            };
        default:return state;
    }
}
import { POSTCHAT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    addchatData:[]
}
export default function PostchatReducer(state =initialState,action){
    switch (action.type){
        case POSTCHAT:
            return{
                ...state,
                addchatData: action.payload,
            };
        default:return state;
    }
}
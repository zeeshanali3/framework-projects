import { POSTATTACHMENTS } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    addattachmenData:[]
}
export default function PostattachmentsReducer(state =initialState,action){
    switch (action.type){
        case POSTATTACHMENTS:
            return{
                ...state,
                addattachmenData: action.payload,
            };
        default:return state;
    }
}
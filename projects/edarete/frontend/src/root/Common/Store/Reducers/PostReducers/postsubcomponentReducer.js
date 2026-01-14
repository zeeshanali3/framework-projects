import { POSTSUBCOMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    addsubcomponentData:[]
}
export default function PostsubcomponentReducer(state =initialState,action){
    switch (action.type){
        case POSTSUBCOMPONENT:
            return{
                ...state,
                addsubcomponentData: action.payload,
            };
        default:return state;
    }
}
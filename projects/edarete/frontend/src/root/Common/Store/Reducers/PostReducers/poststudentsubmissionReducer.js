import { POSTSTUDENTSUBMISSION } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    addstudentsubmissonData:[]
}
export default function PoststudensubmissionReducer(state =initialState,action){
    switch (action.type){
        case POSTSTUDENTSUBMISSION:
            return{
                ...state,
                addstudentsubmissonData: action.payload,
            };
        default:return state;
    }
}
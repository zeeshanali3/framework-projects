import { POSTLECTUREATTENDANCE } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    addlectureattendanceData:[]
}
export default function PostlectureattendanceReducer(state =initialState,action){
    switch (action.type){
        case POSTLECTUREATTENDANCE:
            return{
                ...state,
                addlectureattendanceData: action.payload,
            };
        default:return state;
    }
}
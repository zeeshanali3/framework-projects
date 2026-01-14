import GETCOURSE from "../../../Store/Actions/GetCourseAction/ActionTypes/ReducerType";
import GETCOURSECOUNT from "../../../Store/Actions/GetCourseCount/ActionTypes/ReducerType";
const initialState={
    getcourseData:[],
    getcoursecount:[]
}

export default function GetCourseReducer(state=initialState,action){
    switch (action.type){
        case GETCOURSE:
            return{
                ...state,
                getcourseData: action.payload,
            };
        
        case GETCOURSECOUNT:
            return{
                ...state,
                getcoursecount: action.payload,
            };

        default:
            return state;
    }
}
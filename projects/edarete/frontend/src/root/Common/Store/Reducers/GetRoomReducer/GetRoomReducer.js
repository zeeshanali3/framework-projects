import GETROOM from "../../../Store/Actions/GetRoomAction/ActionType/ReducerType";

const initialState={
    getroomData:[]
}

export default function  GetRoomReducer(state=initialState,action){
    switch (action.type){
        case GETROOM:
            return{
                ...state,
                getroomData: action.payload,
            };
        default:
            return state;
    }
}
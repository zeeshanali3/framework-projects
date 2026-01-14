import {GET_LEADERBOARD ,GET_LEADERBOARD_RESULT,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
   getclassleaderboardData:[],
   getleaderboardresult:[]
}
export default function GetclassleaderboardReducer(state =initialState,action){
    switch (action.type){
        case GET_LEADERBOARD:
            return{
                ...state,
                getclassleaderboardData: action.payload,
            };
        case GET_LEADERBOARD_RESULT:
            return{
                ...state,
                getleaderboardresult: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}
import { ADD_LEADERBOARD } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * AddLeaderboardSaga(){
    yield takeEvery(ADD_LEADERBOARD,fetchData);
}

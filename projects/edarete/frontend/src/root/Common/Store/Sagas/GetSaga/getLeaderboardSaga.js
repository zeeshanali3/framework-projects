import { GET_LEADERBOARD } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetclassleaderboardSaga(){

    yield takeEvery(GET_LEADERBOARD,fetchData);
}
import { GET_LEADERBOARD_RESULT } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetleaderboardresultSaga(){

    yield takeEvery(GET_LEADERBOARD_RESULT,fetchData);
}
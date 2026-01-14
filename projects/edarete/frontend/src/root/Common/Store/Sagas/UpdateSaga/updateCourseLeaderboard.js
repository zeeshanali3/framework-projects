import { UPDATE_COURSE_LEADERBOARD }  from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * UpdateCourseLeaderboard(){

    yield takeEvery(UPDATE_COURSE_LEADERBOARD,fetchData);
}
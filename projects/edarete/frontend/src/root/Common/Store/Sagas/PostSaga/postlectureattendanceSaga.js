import { ADMIN_POST_LECTURE_ATTENDANCE } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * PostlectureattendanceSaga(){

    yield takeEvery(ADMIN_POST_LECTURE_ATTENDANCE,fetchData);
}

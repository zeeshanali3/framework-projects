import { GET_PENDING_COURSES } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetPendingCoursesSaga(){

    yield takeEvery(GET_PENDING_COURSES,fetchData);
}
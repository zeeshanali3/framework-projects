import { ADMIN_GET_COURSE_STUDENT_ENROLLED } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetcoursestudentenrolledSaga(){

    yield takeEvery(ADMIN_GET_COURSE_STUDENT_ENROLLED,fetchData);
}
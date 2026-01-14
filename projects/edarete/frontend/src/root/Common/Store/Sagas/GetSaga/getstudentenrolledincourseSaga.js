import { ADMIN_GET_STUDENT_ENROLLED_IN_COURSE } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetstudentenrolledincourseSaga(){

    yield takeEvery(ADMIN_GET_STUDENT_ENROLLED_IN_COURSE,fetchData);
}
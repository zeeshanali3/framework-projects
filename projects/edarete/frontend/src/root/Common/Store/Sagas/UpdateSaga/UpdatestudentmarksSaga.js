import { ADMIN_UPDATE_STUDENT_MARKS } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * UpdatestudentmarksSaga(){

    yield takeEvery(ADMIN_UPDATE_STUDENT_MARKS,fetchData);
}

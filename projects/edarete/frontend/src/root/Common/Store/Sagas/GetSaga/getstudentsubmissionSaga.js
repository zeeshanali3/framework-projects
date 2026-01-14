import { ADMIN_GET_STUDENT_SUBMISSION } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetstudentsubmissionSaga(){

    yield takeEvery(ADMIN_GET_STUDENT_SUBMISSION,fetchData);
}
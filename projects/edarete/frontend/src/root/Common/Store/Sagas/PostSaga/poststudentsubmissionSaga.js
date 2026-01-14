import { ADMIN_POST_STUDENT_SUBMISSION } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export  function * PoststudentsubmissionSaga(){
    yield takeEvery(ADMIN_POST_STUDENT_SUBMISSION,fetchData);
}

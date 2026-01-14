import { ADMIN_DELETE_STUDENT_SUBMISSION } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export function *DeletestudentsubSaga(){
    yield takeEvery(ADMIN_DELETE_STUDENT_SUBMISSION, fetchData);
}

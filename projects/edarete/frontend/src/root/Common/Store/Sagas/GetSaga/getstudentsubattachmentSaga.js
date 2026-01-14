import { ADMIN_GET_STUDENT_SUBS_ATTACHMENTS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetstudentsubattachmentSaga(){

    yield takeEvery(ADMIN_GET_STUDENT_SUBS_ATTACHMENTS,fetchData);
}
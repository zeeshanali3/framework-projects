import { ADMIN_POST_ATTACHMENTS } from "../../Actions/ActionTypes/ApiActionTypes";


import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * PostattachmentSaga(){

    yield takeEvery(ADMIN_POST_ATTACHMENTS,fetchData);
}

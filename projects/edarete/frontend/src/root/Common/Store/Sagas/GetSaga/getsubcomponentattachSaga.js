import { ADMIN_GET_SUB_ATTACHMENTS } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetsubcomponentattachmentSaga(){

    yield takeEvery(ADMIN_GET_SUB_ATTACHMENTS,fetchData);
}
import { ADMIN_GET_CHATS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetchatSaga(){

    yield takeEvery(ADMIN_GET_CHATS,fetchData);
}

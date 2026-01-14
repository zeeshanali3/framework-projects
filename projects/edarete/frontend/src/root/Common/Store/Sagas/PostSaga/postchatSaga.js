import { ADMIN_POST_CHATS } from "../../Actions/ActionTypes/ApiActionTypes";


import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * PostchatSaga(){

    yield takeEvery(ADMIN_POST_CHATS,fetchData);
}

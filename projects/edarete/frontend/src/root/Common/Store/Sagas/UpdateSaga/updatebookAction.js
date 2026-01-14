import { ADMIN_UPDATE_BOOKS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * UpdatebookSaga(){

    yield takeEvery(ADMIN_UPDATE_BOOKS,fetchData);
}
import { ADMIN_GET_BOOKS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetbookSaga(){

    yield takeEvery(ADMIN_GET_BOOKS,fetchData);
}
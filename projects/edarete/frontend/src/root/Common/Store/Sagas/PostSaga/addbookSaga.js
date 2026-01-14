import { ADMIN_ADD_BOOKS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * AddbookSaga(){
    yield takeEvery(ADMIN_ADD_BOOKS,fetchData);
}

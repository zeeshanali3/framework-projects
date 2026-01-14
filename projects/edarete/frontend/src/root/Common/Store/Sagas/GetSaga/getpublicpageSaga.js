import { ADMIN_GET_PUBLIC_PAGE } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetpublicpageSaga(){
    yield takeEvery(ADMIN_GET_PUBLIC_PAGE,fetchData);
}
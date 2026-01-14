import { GET_CLOS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetclosSaga(){

    yield takeEvery(GET_CLOS,fetchData);
}
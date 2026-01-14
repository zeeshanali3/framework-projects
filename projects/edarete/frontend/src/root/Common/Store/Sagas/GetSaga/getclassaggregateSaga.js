import { GET_CLASS_AGGREGATE } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetClassAggregateSaga(){

    yield takeEvery(GET_CLASS_AGGREGATE,fetchData);
}
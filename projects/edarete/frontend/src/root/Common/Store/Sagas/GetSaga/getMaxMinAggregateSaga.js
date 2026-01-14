import { GET_MAX_MIN_AGGREGATE } from  "../../Actions/ActionTypes/ApiActionTypes"

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * getMaxMinAggregateSaga(){

    yield takeEvery(GET_MAX_MIN_AGGREGATE,fetchData);
}
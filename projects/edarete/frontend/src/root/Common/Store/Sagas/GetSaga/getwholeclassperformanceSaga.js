import { GET_WHOLE_CLASS_PERFORMANCE } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetWholeClassPerformanceSaga(){

    yield takeEvery(GET_WHOLE_CLASS_PERFORMANCE,fetchData);
}
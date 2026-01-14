import { IS_LOADING } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * isLoadingSaga(){
    yield takeEvery(IS_LOADING,fetchData);
}

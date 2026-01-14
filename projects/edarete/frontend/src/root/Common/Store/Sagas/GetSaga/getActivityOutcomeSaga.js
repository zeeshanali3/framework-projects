import  { ACTIVITY_OUTCOME } from "../../Actions/ActionTypes/ApiActionTypes"
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetActivityOutcomeSaga(){

    yield takeEvery(ACTIVITY_OUTCOME,fetchData);
}
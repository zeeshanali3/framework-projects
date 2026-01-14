import { UPDATE_QUESTIONS }  from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * UpdateQuestionSaga(){

    yield takeEvery(UPDATE_QUESTIONS,fetchData);
}
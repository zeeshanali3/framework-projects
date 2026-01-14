import { QUESTION_REPHRASE } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export  function * AddGptQuestionSaga(){
    yield takeEvery(QUESTION_REPHRASE,fetchData);
}

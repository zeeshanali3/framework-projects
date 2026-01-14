import { GET_CLO_GRAPH } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetCloGraphSaga(){

    yield takeEvery(GET_CLO_GRAPH,fetchData);
}
import { ADMIN_GET_SUBCOMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetsubcomponentSaga(){

    yield takeEvery(ADMIN_GET_SUBCOMPONENT,fetchData);
}
import { ADMIN_UPDATE_CLASS_COMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * UpdateclasscomponentSaga(){

    yield takeEvery(ADMIN_UPDATE_CLASS_COMPONENT,fetchData);
}
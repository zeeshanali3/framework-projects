import { TOGGLE_SIDEBAR } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * toggleSidebarSaga(){
    yield takeEvery(TOGGLE_SIDEBAR,fetchData);
}

import { SIDEBAR_DATA,ACTIVE_TAB } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * sideBarDataSaga(){
    yield takeEvery(SIDEBAR_DATA,fetchData);
}
export  function * sideBarActiveTabSaga(){
    yield takeEvery(ACTIVE_TAB,fetchData);
}

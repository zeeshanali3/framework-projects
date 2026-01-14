import { ADMIN_POST_SUBCOMPONENT_MARKS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export  function * PostsubcomponentmarksSaga(){
    yield takeEvery(ADMIN_POST_SUBCOMPONENT_MARKS,fetchData);
}

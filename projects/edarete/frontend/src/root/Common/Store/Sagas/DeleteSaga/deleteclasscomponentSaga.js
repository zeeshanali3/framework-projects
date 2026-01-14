import { ADMIN_DELETE_CLASS_COMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export function *DeleteclasscomponentSaga(){
    yield takeEvery(ADMIN_DELETE_CLASS_COMPONENT, fetchData);
}

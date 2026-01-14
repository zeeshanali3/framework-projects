import { ADMIN_DELETE_SUBCOMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export function *Deletesubcomponent(){
    yield takeEvery(ADMIN_DELETE_SUBCOMPONENT, fetchData);
}

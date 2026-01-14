import { ADMIN_DELETE_BOOKS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export function *Deletebooksaga(){
    yield takeEvery(ADMIN_DELETE_BOOKS, fetchData);
}

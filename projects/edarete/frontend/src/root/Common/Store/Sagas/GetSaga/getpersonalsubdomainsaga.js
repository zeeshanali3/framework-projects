import { GET_PERSONAL_SUBDOMAIN } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetPersonalSubDomainSaga(){

    yield takeEvery(GET_PERSONAL_SUBDOMAIN,fetchData);
}
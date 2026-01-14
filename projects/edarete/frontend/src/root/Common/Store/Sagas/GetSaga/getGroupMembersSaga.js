
import  { GET_GROUP_MEMBERS } from "../../Actions/ActionTypes/ApiActionTypes"
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetgroupmembersSaga(){

    yield takeEvery(GET_GROUP_MEMBERS,fetchData);
}
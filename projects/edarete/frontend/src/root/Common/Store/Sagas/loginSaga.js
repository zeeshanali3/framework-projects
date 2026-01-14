import { ADMIN_LOGIN } from  '../Actions/ActionTypes/ApiActionTypes';
import { takeEvery } from 'redux-saga/effects';
import fetchData from './SagaHelper';
export function* LoginSaga() {
  yield takeEvery(ADMIN_LOGIN, fetchData);
}

import { all, fork } from "redux-saga/effects";

import FormSaga from "./forms/saga";

export default function* rootSaga() {
  yield all([fork(FormSaga)]);
}
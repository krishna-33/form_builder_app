import { takeLatest, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  GET_FORMS,
  ADD_FORM,
  GET_FORM,
  SAVE_FORM_RESPONSE,
} from "./actionTypes";

import {
  getFormsSuccess,
  getFormsFail,
  addFormSuccess,
  addFormFail,
  getFormSuccess,
  getFormFail,
  saveFormResponseSuccess,
  saveFormResponseFail,
} from "./actions";

import {
  getForms,
  addForm,
  getForm,
  saveFormResponse,
} from "../../helpers/backend_helper";

function* onGetForms() {
  try {
    const response = yield call(getForms);
    if (response.success) {
      yield put(getFormsSuccess(response.data));
    } else {
      toast.error("Something went wrong");
      yield put(getFormsFail(response.data));
    }
  } catch (error) {
    yield put(getFormsFail(error.message));
  }
}

function* onGetForm({ payload: id }) {
  try {
    const response = yield call(getForm, id);
    if (response.success) {
      yield put(getFormSuccess(response.data));
    } else {
      toast.error("Something went wrong");
      yield put(getFormFail(response.data));
    }
  } catch (error) {
    yield put(getFormFail(error.message));
  }
}

function* onAddForm({ payload: form }) {
  try {
    const response = yield call(addForm, form);
    if (response.success) {
      toast.success("Form Added");
      yield put(addFormSuccess(response.data));
    } else {
      toast.error("Something went wrong");
      yield put(addFormFail(response.data));
    }
  } catch (error) {
    yield put(addFormFail(error.message));
  }
}

function* onSaveFormResponse({ payload: form }) {
  try {
    const response = yield call(saveFormResponse, form);
    if (response.success) {
       toast.success("Form Response Saved");
      yield put(saveFormResponseSuccess(response.data));
    } else {
      toast.error("Something went wrong");
      yield put(saveFormResponseFail(response.data));
    }
  } catch (error) {
    yield put(saveFormResponseFail(error.message));
  }
}

function* FormSaga() {
  yield takeLatest(GET_FORMS, onGetForms);
  yield takeLatest(GET_FORM, onGetForm);
  yield takeLatest(ADD_FORM, onAddForm);
  yield takeLatest(SAVE_FORM_RESPONSE, onSaveFormResponse);
}

export default FormSaga;

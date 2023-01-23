import {
    GET_FORMS,
    GET_FORMS_SUCCESS,
    GET_FORMS_FAIL,
    ADD_FORM,
    ADD_FORM_SUCCESS,
    ADD_FORM_FAIL,
    GET_FORM,
    GET_FORM_SUCCESS,
    GET_FORM_FAIL,
    SAVE_FORM_RESPONSE,
    SAVE_FORM_RESPONSE_SUCCESS,
    SAVE_FORM_RESPONSE_FAIL
  } from "./actionTypes";

  export const getForms = () => {
    return {
      type: GET_FORMS,
    };
  };
  
  export const getFormsSuccess = (posts) => {
    return {
      type: GET_FORMS_SUCCESS,
      payload: posts,
    };
  };
  
  export const getFormFail = (error) => {
    return {
      type: GET_FORMS_FAIL,
      payload: error,
    };
  };
  
  export const getForm = (id) => {
    return {
      type: GET_FORM,
      payload: id
    };
  };
  
  export const getFormSuccess = (form) => {
    return {
      type: GET_FORM_SUCCESS,
      payload: form,
    };
  };
  
  export const getFormsFail = (error) => {
    return {
      type: GET_FORM_FAIL,
      payload: error,
    };
  };

  export const addForm = (form) => {
    return {
      type: ADD_FORM,
      payload: form,
    };
  };
  
  export const addFormSuccess = (form) => {
    return {
      type: ADD_FORM_SUCCESS,
      payload: form,
    };
  };
  
  export const addFormFail = (error) => {
    return {
      type: ADD_FORM_FAIL,
      payload: error,
    };
  };

  export const saveFormResponse = (form) => {
  return {
    type: SAVE_FORM_RESPONSE,
    payload: form,
  };
};

export const saveFormResponseSuccess = (form) => {
  return {
    type: SAVE_FORM_RESPONSE_SUCCESS,
    payload: form,
  };
};

export const saveFormResponseFail = (error) => {
  return {
    type: SAVE_FORM_RESPONSE_FAIL,
    payload: error,
  };
};


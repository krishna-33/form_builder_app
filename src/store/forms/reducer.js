import {
    GET_FORMS,
    GET_FORMS_SUCCESS,
    GET_FORMS_FAIL,
    GET_FORM,
    GET_FORM_SUCCESS,
    GET_FORM_FAIL,
    ADD_FORM,
    ADD_FORM_SUCCESS,
    ADD_FORM_FAIL,
    SAVE_FORM_RESPONSE,
    SAVE_FORM_RESPONSE_SUCCESS,
    SAVE_FORM_RESPONSE_FAIL
  } from "./actionTypes";

  const initialState = {
    forms: [],
    form: {},
    formDetails: {},
    loadingForms: false,
    loadingAddForm: false,
    loadingFormDetails: false,
    loadingFormResponse: false,
    error: {
      message: "",
    },
  };

  const FormReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case GET_FORMS:
        state = { ...state, loadingForms: true };
        break;
      case GET_FORMS_SUCCESS:
        state = { ...state, forms: action.payload, loadingForms: false };
        break;
  
      case GET_FORMS_FAIL:
        state = {
          ...state,
          error: {
            message: "Error",
          },
          loadingForms: false,
        };
        break;

        case GET_FORM:
          state = { ...state, loadingFormDetails: true };
          break;
        case GET_FORM_SUCCESS:
          state = { ...state, formDetails: action.payload, loadingFormDetails: false };
          break;
    
        case GET_FORM_FAIL:
          state = {
            ...state,
            error: {
              message: "Error",
            },
            loadingFormDetails: false,
          };
          break;

        case ADD_FORM:
            state = { ...state, loadingAddForm: true };
            break;
          case ADD_FORM_SUCCESS:
            state = { ...state, form: action.payload, loadingAddForm: false };
            break;
          case ADD_FORM_FAIL:
            state = {
              ...state,
              error: {
                message: "Error",
              },
              loadingAddForm: false,
            };
            break;

            case SAVE_FORM_RESPONSE:
            state = { ...state, loadingFormResponse: true };
            break;
          case SAVE_FORM_RESPONSE_SUCCESS:
            state = { ...state, form: action.payload, loadingFormResponse: false };
            break;
          case SAVE_FORM_RESPONSE_FAIL:
            state = {
              ...state,
              error: {
                message: "Error",
              },
              loadingFormResponse: false,
            };
            break;
    
      default:
        state = { ...state };
        break;
    }
    return state;
  };

  export default FormReducer;
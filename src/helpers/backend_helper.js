import { get, post } from "./api_helper";
import * as url from "./url_helper";

export const getForms = () => { 
  return get(url.GET_FORMS)
  .then((response) => {
    if (response.status === 200) {
      return {
        message: "Success",
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        message: "Something went wrong",
        data: ""
      };
    }
  })};

export const getForm = (id) => get(url.GET_FORM, { params: { id: id } });

export const addForm = (form) => {
  return post(url.ADD_FORM, {
    ...form,
  })
    .then((response) => {
      if (response.status === 200) {
        return {
          message: "Success",
          success: true,
          data: response.data
        };
      } else {
        return {
          success: false,
          message: "Something went wrong",
          data: ""
        };
      }
    })
    .catch((error) => error);
};

export const saveFormResponse = (form) =>{
  return post(url.SAVE_FORM_RESPONSE, {
    ...form,
  })
  .then((response) => {
    if (response.status === 200) {
      return {
        message: "Success",
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        message: "Something went wrong",
        data: ""
      };
    }
  })
  .catch((error) => error);
}


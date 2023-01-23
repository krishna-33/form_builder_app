import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForm, saveFormResponse } from "../../../store/forms/actions";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../../../common/loader";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Card,
  FormHelperText,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import SuccessMessage from "./Components/SuccessMessage";

const DisplayForm = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  const { formDetails, loadingFormDetails } = useSelector(
    (state) => state.FormReducer
  );
  const [dataAdded, setDataAdded] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const dynamicValidationSchema = () => {
    let validation = {};
    formDetails?.questions.forEach((q) => {
      switch (q.type) {
        case "text":
          validation[q.question] = q.isRequired
            ? Yup.string().required("This field is required")
            : Yup.mixed();
          break;
        case "radio":
          validation[q.question] = q.isRequired
            ? Yup.mixed().required("This field is required")
            : Yup.mixed();
          break;
        case "checkbox":
          validation[q.question] = q.isRequired
            ? Yup.mixed().required("Atleast select one")
            : Yup.mixed();
          break;
      }
    });
    return validation;
  };
  const handleCancel = () => window.location.reload();
  const { values, getFieldProps, handleSubmit, errors, touched, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formDetails?.questions?.length
        ? Yup.object().shape(dynamicValidationSchema())
        : "",
      onSubmit: (values) => {
        const payload = {
          id,
          ...values,
        };
        dispatch(saveFormResponse(payload));
        setDataAdded(true);
        resetForm();
      },
    });
  useEffect(() => {
    formDetails.questions?.length &&
      setInitialValues(
        formDetails.questions.reduce(
          (field, value, index) => ({
            ...field,
            [value.question]: "",
          }),
          {}
        )
      );
  }, [formDetails]);

  useEffect(() => {
    dispatch(getForm(id));
  }, []);

  return (
    <>
      {loadingFormDetails ? (
        <Loader />
      ) : (
        <Card
          sx={{
            width: "100%",
            maxWidth: "560px",
            margin: "auto",
            px: 2,
            py: 3,
          }}
        >
          {dataAdded ? (
            <SuccessMessage setDataAdded={setDataAdded} />
          ) : (
            <>
              <h2>{formDetails ? formDetails?.name : ""}</h2>
              {formDetails?.questions?.length > 0 ? (
                <Grid container spacing={2} className="container">
                  {formDetails.questions.map((i, index) => (
                    <Grid item md={12} className="inputs" key={index}>
                      {i.type === "text" ? (
                        <TextField
                          name={`${i.question}`}
                          label={i.question}
                          {...getFieldProps(`${i.question}`)}
                          variant="outlined"
                          sx={{ width: "100%" }}
                          error={touched[i.question] && errors[i.question]}
                          helperText={touched[i.question] && errors[i.question]}
                        />
                      ) : (
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                        >
                          <FormControl
                            component="fieldset"
                            {...getFieldProps(`${i.question}`)}
                          >
                            <FormLabel
                              sx={{ marginRight: "auto" }}
                              component="legend"
                            >
                              {i.question}
                            </FormLabel>
                            {i.type === "radio" ? (
                              <>
                                <RadioGroup
                                  aria-label="gender"
                                  name={`${i.question}`}
                                >
                                  <Stack direction="row">
                                    {i.options.map((op, index) => (
                                      <FormControlLabel
                                        key={index}
                                        value={op}
                                        control={<Radio />}
                                        label={op}
                                      />
                                    ))}
                                  </Stack>
                                </RadioGroup>
                                {touched[i.question] && errors[i.question] && (
                                  <FormHelperText>
                                    {errors[i.question]}
                                  </FormHelperText>
                                )}
                              </>
                            ) : (
                              <FormGroup
                                {...getFieldProps(`${i.question}`)}
                                name={`${i.question}`}
                                error={
                                  touched[i.question] && errors[i.question]
                                }
                              >
                                <Stack direction="row">
                                  {i.options.map((op, index) => (
                                    <FormControlLabel
                                      key={index}
                                      control={
                                        <Checkbox
                                          value={op}
                                          name={`${i.question}`}
                                        />
                                      }
                                      label={op}
                                    />
                                  ))}
                                </Stack>
                                {touched[i.question] && errors[i.question] && (
                                  <FormHelperText sx={{ display: "block" }}>
                                    {errors[i.question]}
                                  </FormHelperText>
                                )}
                              </FormGroup>
                            )}
                          </FormControl>
                        </Stack>
                      )}
                    </Grid>
                  ))}
                  <Grid>
                    <Button
                      variant="contained"
                      sx={{ margin: 2 }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ margin: 2, width: "100px" }}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              ) : null}
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default DisplayForm;

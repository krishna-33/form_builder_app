import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Field, useFormik } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";

const AddQuestionsDialog = ({
  open,
  setOpen,
  allQuestionAnswer,
  setAllQuestionAnswer,
  setQuestionError,
}) => {
  const [formikValues, setFormikValues] = useState(null);

  const answerTypes = [
    { id: 1, label: "Text", value: "text" },
    { id: 2, label: "Multi Choice Checkbox", value: "checkbox" },
    { id: 3, label: "Single Select radio", value: "radio" },
  ];
  const handleClose = () => { resetForm(); setOpen(false);};

  const validation = useMemo(() => {
    let dynamicValidation =
      formikValues && Object.keys(formikValues).length
        ? Object.keys(formikValues).reduce((validations, value) => {
            
            if(value === "options"){
              return validations
            }

            if (value === "type") {
              if (formikValues.type !== "text") {
                validations["options"] = Yup.mixed().required();
              } else {
                validations["options"] = Yup.mixed();
              }
              return { ...validations, [value]: Yup.mixed().required() };
            }
            return { ...validations, [value]: Yup.mixed().required() };
          }, {})
        : "";
    return dynamicValidation ?? "";
  }, [formikValues]);

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
    getFieldProps,
    setFieldError,
    resetForm
  } = useFormik({
    initialValues: { question: "", type: "", isRequired: true },
    validationSchema: Yup.object().shape(validation),
    onSubmit: (values) => {
      const questionObj = { ...values, options: values.options.split("\n") };
      const updatedQuestions = [...allQuestionAnswer, questionObj];
      setAllQuestionAnswer(updatedQuestions);
      setQuestionError(updatedQuestions.length > 0 ? false : true);
      handleClose();

    },
  });

  useEffect(() => {
    setFormikValues(values);
  }, [values]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={"md"}
      key={"add-questions-dialog"}
    >
      <DialogTitle id="alert-dialog-title">{"Add Question"}</DialogTitle>
      <DialogContent>
        <FormControl required={true} sx={{ width: "100%" }}>
          <TextField
            id="question"
            name="question"
            label="Question"
            variant="outlined"
            {...getFieldProps("question")}
            error={touched.question && errors.question}
            helperText={touched.question && errors.question}
          />
        </FormControl>

        <br />
        <FormControl
          sx={{ mt: 2, minWidth: 120, width: "100%" }}
          {...getFieldProps("type")}
          error={touched.type && errors.type}
          helperText={touched.type && errors.type}
        >
          <InputLabel htmlFor="answerType">Answer Type</InputLabel>
          <Select
            autoFocus
            label="Answer Type"
            inputProps={{
              name: "answerType",
              id: "answerType",
            }}
            onChange={(data) => {
              setFieldValue("type", data.target.value);
              if (data.target.value === "text") {
                setFieldError("options", "");
                setFieldValue("options", "");
              }
            }}
          >
            {answerTypes.map((type) => (
              <MenuItem value={type.value}>{type.label}</MenuItem>
            ))}
          </Select>
          {touched.type && errors.type && (
            <FormHelperText id="my-helper-text">{errors.type}</FormHelperText>
          )}
        </FormControl>

        {/* {values.answerType === "checkbox" || values.answerType === "radio" ? ( */}
        {values.type &&
        (values.type === "checkbox" || values.type === "radio") ? (
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <TextField
              multiline
              rows={5}
              name="options"
              label="Options"
              variant="outlined"
              {...getFieldProps(`options`)}
              error={touched.options || errors.options}
              helperText={touched.options || errors.options}
            />
          </FormControl>
        ) : null}
        <FormControlLabel
          label={"Required Field"}
          {...getFieldProps("isRequired")}
          onChange={() => setFieldValue("isRequired", !values.isRequired)}
          control={<Checkbox checked={values.isRequired} />}
          error={touched.isRequired && errors.isRequired}
          helperText={touched.isRequired && errors.isRequired}
        />
      </DialogContent>
      <Box
        noValidate
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "auto",
          width: "fit-content",
        }}
      ></Box>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default AddQuestionsDialog;
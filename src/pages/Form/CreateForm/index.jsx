import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Card } from "@mui/material";
import AddQuestionsDialog from "./Components/AddQuestionsDialog";
import { addForm } from "../../../store/forms/actions";
import { useDispatch } from "react-redux";
import QuestionTable from "./Components/QuestionsTable";

const CreateForm = () => {
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formNameError, setFormNameError] = useState(false);
  const [allQuestionAnswer, setAllQuestionAnswer] = useState([]);
  const [questionError, setQuestionError] = useState(false);
  const addQuestion = () => setOpen(true);

  const handleSave = () => {
    setFormNameError(formName ? false : true);
    setQuestionError(allQuestionAnswer.length > 0 ? false : true);
    if (formName && allQuestionAnswer.length > 0) {
      dispatch(
        addForm({
          name: formName,
          questions: allQuestionAnswer,
        })
      );
      handleCancel();
    }
  };
  const handleCancel = () => {
    setFormName("");
    setFormNameError(false);
    setAllQuestionAnswer([]);
    setQuestionError(false);
  };
  return (
    <Card
      sx={{ maxWidth: "570px", width: "100%", margin: "auto", px: 3, py: 5 }}
    >
      <TextField
        id="form-name"
        label="Form Name"
        variant="outlined"
        sx={{ width: "100%" }}
        value={formName}
        onChange={(e) => {
          setFormName(e.target.value);
          setFormNameError(false);
        }}
        error={formNameError}
        helperText={formNameError ? "Please enter form name" : ""}
      />
      <br />
      <Button variant="contained" sx={{ margin: 4 }} onClick={addQuestion}>
        Add Question
      </Button>
      <QuestionTable rows={allQuestionAnswer} />
      {questionError ? (
        <Typography variant="p" sx={{ color: "#d32f2f" }}>
          Please add at least one question
        </Typography>
      ) : null}
      <AddQuestionsDialog
        open={open}
        setOpen={setOpen}
        allQuestionAnswer={allQuestionAnswer}
        setAllQuestionAnswer={setAllQuestionAnswer}
        setQuestionError={setQuestionError}
      />
      <Grid>
        <Button variant="contained" sx={{ margin: 2 }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ margin: 2, width: "100px" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Grid>
    </Card>
  );
};

export default CreateForm;

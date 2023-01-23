import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
  Box,
} from "@mui/material";
import "../form.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getForms } from "../../../store/forms/actions";
import { Link } from "react-router-dom";
import NoEntries from "../../../common/noEntries";

const columns = [
  { id: "name", label: "Form Name", align: "left" },
  { id: "url", label: "Form URL", align: "left" },
  { id: "created_at", label: "Created At", align: "left" },
  { id: "response", label: "Total Responses", align: "right" },
];

const FormList = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const { forms, loadingForms } = useSelector((state) => state.FormReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const AddNewForm = () => {
    navigate("/new");
  };

  useEffect(() => {
    dispatch(getForms());
  }, []);

  const DateFormate = (date) => new Date(date).toISOString().slice(0, 10);
  return (
    <Paper sx={{ width: "100%" }}>
      {loadingForms ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
        <Button
        variant="contained"
        sx={{ float: "right", margin: 2 }}
        onClick={AddNewForm}
      >
        Add New Form
      </Button>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ backgroundColor: "#7376cf", color: "#fff" }}
                      key={column.id}
                      align={column.align}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {forms && forms.length > 0
                  ? forms
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <React.Fragment key={index}>
                            <TableRow hover role="checkbox" tabIndex={-1}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.id === "url" ? (
                                      <Link
                                        to={value.replace(
                                          window.location.origin,
                                          ""
                                        )}
                                        target="_blank"
                                      >
                                        {value}
                                      </Link>
                                    ) : column.id === "response" ? (
                                      value.length
                                    ) : column.id === "created_at" ? (
                                      DateFormate(value)
                                    ) : (
                                      value
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          </React.Fragment>
                        );
                      })
                  : null}
              </TableBody>
            </Table>
            {forms.length == 0 ? <NoEntries /> : null}
          </TableContainer>
          {forms.length > 0 ? (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={forms?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </>
      )}
    </Paper>
  );
};

export default FormList;

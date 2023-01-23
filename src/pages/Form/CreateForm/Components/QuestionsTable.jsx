import React, { useEffect, useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Collapse,
  Box
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const QuestionTable = ({ rows }) => {
  const Row = ({ row }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow key={row.name} sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            {row.type !== "text" ? (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            ) : null}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.question}
          </TableCell>
          <TableCell>{row.type}</TableCell>
          <TableCell>{row.isRequired ? "Yes" : "No"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="cameras">
                  <TableHead>
                    <TableRow>
                      <TableCell>Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ whiteSpace: "break-spaces" }}>
                        {JSON.stringify(row.options, undefined, "\t")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };
  return (
    <TableContainer component={Paper}>
      <Table className="question-table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{fontWeight: 'bold'}}>Question</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Answer Type</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Required Field</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuestionTable

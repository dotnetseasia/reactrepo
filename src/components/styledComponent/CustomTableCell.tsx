import * as React from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { alpha, styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  whiteSpace: "nowrap",
  [`&.${tableCellClasses.head}`]: {
    //   backgroundColor: theme.palette.common.black,
    //   color: theme.palette.common.white,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.grey[600],
    fontWeight: 400,
  },
 
}));

export default StyledTableCell;

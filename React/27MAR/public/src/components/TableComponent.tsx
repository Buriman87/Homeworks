import { JSX } from "@emotion/react/jsx-runtime";
import React from "react";
import { IFlat } from "../Interfaces/Interfaces";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface ITableComponentProps {
  flats: IFlat[];
}

const TableComponent: React.FC<ITableComponentProps> = (props): JSX.Element => {
  const { flats } = props;
  const tableHeaders = ["city", "street", "number", "price", "areasize"];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((el, index) => {
              return (
                <TableCell align="left" key={index}>
                  {el}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {flats.map((flat, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{flat.city}</TableCell>
              <TableCell align="left">{flat.street}</TableCell>
              <TableCell align="left">{flat.number}</TableCell>
              <TableCell align="left">{flat.price}</TableCell>
              <TableCell align="left">{flat.areasize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

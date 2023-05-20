import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { ScoreDTO } from "../../../../service/score/score";

interface DriversTableProps {
  drivers: ScoreDTO[];
}

export function DriversTable({ drivers }: DriversTableProps) {
  const [driversArray, setDriversArray] = useState(drivers);
  const firstDriver = driversArray[0];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ paddingRight: "16px" }}>Posição</TableCell>
              <TableCell>Nome do Piloto</TableCell>
              <TableCell style={{ paddingLeft: "16px" }}>Pontuação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {driversArray.map((driver, index) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor:
                    index === 0 && firstDriver.score > 0
                      ? "#c8e6c9"
                      : index === 0 && firstDriver.score < 0
                      ? "#ffcdd2"
                      : index === drivers.length - 1
                      ? "#ffcdd2"
                      : "transparent",
                }}
              >
                <TableCell style={{ paddingRight: "16px" }}>
                  {index + 1}
                </TableCell>
                <TableCell>{driver.driver.name}</TableCell>
                <TableCell style={{ paddingLeft: "16px" }}>
                  {driver.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {firstDriver.score !== 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <ArrowUpward fontSize="large" />
          </IconButton>
          <Typography variant="h6" align="center" color="textSecondary">
            {"Esse aqui tá fudido"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

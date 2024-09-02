"use client";
import React, { useState } from "react";
import CardInfoInicio from "./components/CardInfo";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TableHome from "./components/TableHome";

export default function home() {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 4, sm: 4, md: 4 }}>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <CardInfoInicio
          title={"Account"}
          numPrin={"0x49faC9237f1e4364F584866777BAEf38229859F5"}
          icon={"pi-wallet"}
          numText={""}
          text={
            "Número de proyectos en los que actualmente has invertido y estas generando ganancias"
          }
          link={"portafolio"}
          color={"bg-blue-500"}
        />
        <CardInfoInicio
          title={"# Employes"}
          numPrin={"12"}
          icon={"pi-users"}
          numText={""}
          text={
            "Número de proyectos en los que actualmente has invertido y estas generando ganancias"
          }
          link={"portafolio"}
          color={"bg-blue-500"}
        />
        <CardInfoInicio
          title={"Balance"}
          numPrin={"12 ETH"}
          icon={"pi-dollar"}
          numText={""}
          text={
            "Número de proyectos en los que actualmente has invertido y estas generando ganancias"
          }
          link={"portafolio"}
          color={"bg-green-500"}
        />
      </Box>
      <Box sx={{ width: "100vw" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 12, sm: 12, md: 12 }}
        >
          <Grid size={12}>
            <TableHome />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

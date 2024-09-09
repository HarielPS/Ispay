"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import { MultiSelect } from "primereact/multiselect";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { Tooltip } from "primereact/tooltip";
import { useTheme } from "@mui/material";
import getColor from "@/themes/colorUtils";

export default function GeneralUserInfo({
  generalUserInformation,
  setGeneralUserInformation,
}) {
  const theme= useTheme();
  const toast = useRef(null);
  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };

  useEffect(() => {
    console.log(generalUserInformation);
  }, [generalUserInformation]);

  const hadleChangeSelectAdmin = (value) => {
    setChecked(value);
    handleChange("role", "ADMIN");
    handleChange("is_admin", value);
  };
  const handleChange = (field, value) => {
    setGeneralUserInformation((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  return (
    <>
      <Toast ref={toast} />
      <Card
        title="General user information"
        style={{ height: "auto", minHeight: "60vh", background:getColor(theme,'background'),color:getColor(theme,'text')}}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={4}>
              <div className="flex-auto">
                <label htmlFor="ID employee" className="font-bold block mb-2">
                  ID employee
                </label>
                <InputText
                  placeholder="ID employee"
                  className="w-full"
                  value={generalUserInformation.ID_user}
                  onChange={(e) => handleChange("ID_user", e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label htmlFor="name" className="font-bold block mb-2">
                  Name
                </label>
                <InputText
                  placeholder="Name"
                  className="w-full"
                  value={generalUserInformation.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label htmlFor="serial" className="font-bold block mb-2">
                  Surname
                </label>
                <InputText
                  placeholder="Surname"
                  className="w-full"
                  value={generalUserInformation.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label htmlFor="ssn" className="font-bold block mb-2">
                  SSN
                </label>
                <InputText
                  style={{background:getColor(theme,'background'),color:getColor(theme,'text')}}
                  placeholder="SSN"
                  className="w-full"
                  value={generalUserInformation.ssn}
                  onChange={(e) => handleChange("ssn", e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label htmlFor="email" className="font-bold block mb-2">
                  Work email
                </label>
                <InputText
                  style={{background:getColor(theme,'background'),color:getColor(theme,'text')}}
                  keyfilter="email"
                  placeholder="Email"
                  className="w-full"
                  value={generalUserInformation.work_email}
                  onChange={(e) => handleChange("work_email", e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label htmlFor="role" className="font-bold block mb-2">
                  Role
                </label>
                <InputText
                  style={{background:getColor(theme,'background'),color:getColor(theme,'text')}}
                  keyfilter="alphanum"
                  placeholder="Role"
                  className="w-full"
                  value="ADMIN"
                  disabled
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}

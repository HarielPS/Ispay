"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { Box, Grid, Paper, Typography, Avatar, Button, backdropClasses } from '@mui/material';

import { countries } from "../helpers/list.countries";
import { numEmployees } from "../helpers/list.numEmployees";
import { groupedMarkets } from "../helpers/list.companyRoles";
import { useTheme } from "@mui/material";
import getColor from "@/themes/colorUtils";
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { ChevronRightIcon } from "primereact/icons/chevronright";

export default function CompanySignup({
  companyInformation,
  setCompanyInformation,
}) {
  const toast = useRef(null);
  const [createDataAccount, setCreateDataAccount] = useState({
    ID_employee: "",
    name: "",
    surname: "",
    ssn: "",
    work_email: "",
    role: "",
    is_admin: false,
    min_amount: 0,
    max_amount: 0,
    start_withdraw: "",
    final_withdraw: "",
    days: [],
    expense_category: [],
  });

  const theme = useTheme();

  // Función para manejar cambios en los campos del formulario
  const handleChange = (field, value) => {
    setCompanyInformation((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Template para el país seleccionado
  const selectedCountryTemplate = (option, props) => {
    if (option && option.name) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            className={`mr-2 flag flag-${option.code.toLowerCase()}`}
            style={{ width: "18px" }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  // Template para los países en el Dropdown
  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
          className="mr-2"
          style={{ width: "20px", height: "15px" }} // Ajusta el tamaño si es necesario
        />
        <div>{option.name}</div>
      </div>
    );
  };
  

  // Template para el Dropdown de roles de la empresa
  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };

  // Template para el footer del panel del Dropdown
  const panelFooterTemplate = (companyInformation) => {
    return (
      <div className="py-2 px-3">
        {companyInformation?.company_headquarters?.name ? (
          <span>
            <b>{companyInformation.company_headquarters.name}</b> selected.
          </span>
        ) : (
          "No country selected."
        )}
      </div>
    );
  };

// imagen de perfil
  const [profileImg, setProfileImg] = useState('');

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyInformation((prevState) => ({
          ...prevState,
          company_image: reader.result, // Guarda la imagen en `company_image`
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: getColor(theme, 'background'),
        borderRadius: 2,
        boxShadow: `0px 4px 10px ${getColor(theme, 'shadow')}`,
      }}
    >
      <Toast ref={toast} />
      <Card
        title="Company information"
        style={{
          minHeight: "60vh",
          backgroundColor: getColor(theme, "background"),
          color: getColor(theme, "text"),
        }}
      >
<Box sx={{ width: "100%", minHeight: "100%" }}>
  <Grid container spacing={2} sx={{ width: "100%" }}>
    {/* Imagen de perfil */}
    <Grid item xs={12}>
      <Paper sx={{ p: 2, width: '100%', background: getColor(theme, 'background') }}>
        <Typography variant="subtitle1" gutterBottom align="center">
          Cambia tu foto de perfil desde aquí
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Avatar
            src={companyInformation.company_image}
            sx={{ width: 80, height: 80 }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" component="label" color="primary" sx={{ mr: 2 }}>
            Subir Imagen
            <input type="file" hidden accept="image/*" onChange={handleProfileImgChange} />
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => handleChange("company_image", "")}>
            Resetear
          </Button>
        </Box>
        <Typography variant="caption" display="block" sx={{ mt: 2 }} align="center">
          Permitidos JPG, GIF o PNG. Tamaño máximo de 800K
        </Typography>
      </Paper>
    </Grid>

    {/* Company Tax ID */}
    <Grid item xs={12} sm={6}>
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Company Tax ID
      </Typography>
      <InputText
        placeholder="Company Tax ID"
        className="w-full"
        style={{
          backgroundColor: getColor(theme, "background"),
          color: getColor(theme, "text"),
          width: "100%",
        }}
        value={companyInformation.ID_company_tax}
        onChange={(e) => handleChange("ID_company_tax", e.target.value)}
      />
    </Grid>

    {/* Company Name */}
    <Grid item xs={12} sm={6}>
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Company's Name
      </Typography>
      <InputText
        placeholder="Company's Name"
        className="w-full"
        style={{
          backgroundColor: getColor(theme, "background"),
          color: getColor(theme, "text"),
          width: "100%",
        }}
        value={companyInformation.company_name}
        onChange={(e) => handleChange("company_name", e.target.value)}
      />
    </Grid>

    {/* Legal Company Name */}
    <Grid item xs={12} sm={6}>
    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Legal Company Name
      </Typography>
      <InputText
        placeholder="Legal Company Name"
        className="w-full"
        style={{
          backgroundColor: getColor(theme, "background"),
          color: getColor(theme, "text"),
          width: "100%",
        }}
        value={companyInformation.legal_company_name}
        onChange={(e) => handleChange("legal_company_name", e.target.value)}
      />
    </Grid>

    {/* Website */}
    <Grid item xs={12} sm={6}>
    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Website
      </Typography>
      <InputText
        placeholder="Website"
        className="w-full"
        style={{
          backgroundColor: getColor(theme, "background"),
          color: getColor(theme, "text"),
          width: "100%",
        }}
        value={companyInformation.website}
        onChange={(e) => handleChange("website", e.target.value)}
      />
    </Grid>

    {/* Headquarters */}
    <Grid item xs={12} sm={6}>
  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
    Company's Headquarters
  </Typography>
  <Dropdown
    filter
    value={companyInformation.company_headquarters}
    onChange={(e) => handleChange("company_headquarters", e.value)}
    options={countries}
    optionLabel="name"
    placeholder="Select a Country"
    valueTemplate={selectedCountryTemplate}
    itemTemplate={countryOptionTemplate}
    className="w-full"
    style={{
      backgroundColor: getColor(theme, "background"),
      color: getColor(theme, "text"),
    }}
    panelFooterTemplate={panelFooterTemplate}
    dropdownIcon={(opts) => {
      return opts.iconProps["data-pr-overlay-visible"] ? (
        <ChevronRightIcon {...opts.iconProps} />
      ) : (
        <ChevronDownIcon {...opts.iconProps} />
      );
    }}
  />
</Grid>


    {/* Number of Employees */}
    <Grid item xs={12} sm={6}>
    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Select Number of Employees
      </Typography>
      <Dropdown
        value={companyInformation.number_employees}
        onChange={(e) => handleChange("number_employees", e.target.value)}
        options={numEmployees}
        optionLabel="name"
        placeholder="Select Number of Employees"
        className="w-full"
        style={{
          backgroundColor: getColor(theme, "background"),
          color: getColor(theme, "text"),
          width: "100%",
        }}
      />
    </Grid>

    {/* Company Role */}
    <Grid item xs={12}>
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Select Company Role
      </Typography>
      <MultiSelect
        filter
        value={companyInformation.company_role}
        options={groupedMarkets}
        onChange={(e) => handleChange("company_role", e.value)}
        optionLabel="label"
        placeholder="Select Company Role"
        display="chip"
        className="w-full"
        style={{
          backgroundColor: getColor(theme, "background"),
          color: getColor(theme, "text"),
          width: "100%",
        }}
      />
    </Grid>

    {/* Company Description */}
    <Grid item xs={12}>
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Company's Description
      </Typography>
      <InputTextarea
        value={companyInformation.company_description}
        onChange={(e) => handleChange("company_description", e.target.value)}
        rows={5}
        cols={30}
        className="w-full"
        style={{
          backgroundColor: getColor(theme, "background"),
          color: getColor(theme, "text"),
          width: "100%",
        }}
      />
    </Grid>
  </Grid>
</Box>

      </Card>
    </Box>
  );
}

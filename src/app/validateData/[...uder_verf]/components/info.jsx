"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { Box } from "@mui/material";
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
import { countries } from "../helpers/list.countries";
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { ChevronRightIcon } from "primereact/icons/chevronright";
import { Password } from "primereact/password";
import {Paper, Typography, Avatar} from "@mui/material";
import { useTheme } from "@mui/material";
import getColor from "@/themes/colorUtils";

export default function UserSafetyInfo() {

  const theme = useTheme();
  const toast = useRef(null);

  const [userSafetyInfo, setUserSafetyInfo] = useState({
    image: "",
    password: "",
    password_validation: "",
    phone_number: "",
    work_location: "",
  });

  const [userImageFile, setUserImageFile] = useState(null);

  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };

  const handleCreateAccount = () => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
      life: 3000,
    });
  };
  // useEffect(() => {
  //   console.log(userSafetyInfo);
  // }, [userSafetyInfo]);

  const handleChange = (field, value) => {
    setUserSafetyInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const selectedCountryTemplate = (option, props) => {
    if (option) {
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

  const countryOptionTemplate = (option) => {
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
  };

  const panelFooterTemplate = () => {
    return (
      <div className="py-2 px-3">
        {userSafetyInfo.work_location ? (
          <span>
            <b>{userSafetyInfo.work_location.name}</b> selected.
          </span>
        ) : (
          "No country selected."
        )}
      </div>
    );
  };
  // imagen de perfil
  const [profileImg, setProfileImg] = useState('');

  const handleUserImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImageFile(file);  // Aquí actualizamos el estado en el componente padre

      // Vista previa en base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserSafetyInfo((prevState) => ({
          ...prevState,
          image: reader.result,  // Aquí solo para la vista previa
        }));
      };
      reader.readAsDataURL(file);  // Leer el archivo como base64 para la vista previa
    }
  };

  return (
<>
  <Toast ref={toast} />
  <Card title="Security Questions" style={{ minHeight: "60vh", textAlign: "center",background:getColor(theme,'background'),color:getColor(theme,'text') }}>
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
        alignItems="center"    
        direction="column"   
        // sx={{background:'green'}}
      >
    {/* Imagen de perfil */}
    <Grid item xs={12} sx={{ width:'100%', background:getColor(theme,'background')}}>
      <Paper sx={{ p: 2, width: '100%',background:getColor(theme,'background') }}>
        <Typography variant="subtitle1" gutterBottom align="center">
          Cambia tu foto de perfil desde aquí
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Avatar
            src={userSafetyInfo.image}
            sx={{ width: 80, height: 80 }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          component="label"
          color="primary"
          style={{ backgroundColor: getColor(theme, 'primary') }}
        >
          Subir Imagen
          <input
          type="file"
          accept="image/*"
          onChange={handleUserImgChange}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        />
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          sx={{ borderColor: getColor(theme, 'secondary'), padding: '10px 20px', fontSize: '14px' }}
          onClick={() => handleChange("image", "")}
        >
          Resetear
        </Button>
      </Box>


        <Typography variant="caption" display="block" sx={{ mt: 2 }} align="center">
          Permitidos JPG, GIF o PNG. Tamaño máximo de 800K
        </Typography>
      </Paper>
    </Grid>

        {/* Inputs distribuidos debajo de la imagen */}
        <Grid item xs={12} sx={{width:'100%'}}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <div className="flex-auto">
                <label htmlFor="Work location" className="font-bold block mb-2">
                  Work location
                </label>
                <Dropdown
                  filter
                  value={userSafetyInfo.work_location}
                  onChange={(e) => handleChange("work_location", e.value)}
                  options={countries}
                  optionLabel="name"
                  placeholder="Select a Country"
                  valueTemplate={selectedCountryTemplate}
                  itemTemplate={countryOptionTemplate}
                  className="w-full"
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className="flex-auto">
                <label htmlFor="Phone number" className="font-bold block mb-2">
                  Phone number
                </label>
                <InputText
                  keyfilter="num"
                  placeholder="Phone number"
                  className="w-full"
                  value={userSafetyInfo.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className="flex-auto">
                <label htmlFor="Password" className="font-bold block mb-2">
                  Password
                </label>
                <Password
                  tooltip="It must be 8 characters long and contain lowercase and uppercase letters (a-z, A-z), numbers (1-9), and special symbols (&*()/?.,)"
                  value={userSafetyInfo.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  toggleMask
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className="flex-auto">
                <label htmlFor="Confirm password" className="font-bold block mb-2">
                  Confirm password
                </label>
                <Password
                  tooltip="It must be 8 characters long and contain lowercase and uppercase letters (a-z, A-z), numbers (1-9), and special symbols (&*()/?.,)"
                  value={userSafetyInfo.password_validation}
                  onChange={(e) => handleChange("password_validation", e.target.value)}
                  toggleMask
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Card>
</>

  );
}

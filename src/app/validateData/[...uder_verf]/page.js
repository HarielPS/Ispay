"use client";
import React, { useState, useRef,useEffect } from "react";
import { Card } from "primereact/card";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Avatar, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import { db,auth } from "@/services/Firebase/Firebase";
import { useRouter } from "next/navigation";
import getColor from "@/themes/colorUtils";
import { countries } from "@/app/auth/signup/helpers/list.countries";
import { Toast } from "primereact/toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(); 

export default function UserSafetyInfo({ params }) {
  
  const router = useRouter();
  // const { uid, ID_company_tax } = router.query;
  const [uid, ID_company_tax] = params.uder_verf || [];
  
  const theme = useTheme();
  const toast = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [userSafetyInfo, setUserSafetyInfo] = useState({
    image: "",
    password: "",
    password_validation: "",
    phone_number: "",
    work_location: "",
  });
  const [userImageFile, setUserImageFile] = useState(null);

  // Manejo de la imagen de perfil
  const handleUserImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUserSafetyInfo((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejo de inputs
  const handleChange = (field, value) => {
    setUserSafetyInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(()=>{
    console.log(params);
  },[params]);

  useEffect(() => {
    if (!uid || !ID_company_tax) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se encontraron los parámetros necesarios en la URL",
        life: 3000,
      });
      setTimeout(() => {
        router.push("/");  // Redirige después de 3 segundos para dar tiempo de mostrar el mensaje
      }, 3000);
    }
  }, [uid, ID_company_tax]);
  

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

  const handleSubmit = async () => {
    if (userSafetyInfo.password !== userSafetyInfo.password_validation) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Las contraseñas no coinciden",
        life: 3000,
      });
      return;
    }
  
    setLoading(true);
    try {
      // Subir la imagen del usuario si está disponible
      let userImageUrl = "";
      console.log("ID_company_tax: "+ ID_company_tax);
      console.log("uid: " + uid);
      if (userImageFile) {
        console.log("Subiendo imagen del usuario...");
        const userImageRef = ref(storage, `EMPRESAS/${ID_company_tax}/USUARIO/${uid}/profile_image.jpg`);
        await uploadBytes(userImageRef, userImageFile);  // Subir la imagen al almacenamiento
        userImageUrl = await getDownloadURL(userImageRef);  // Obtener la URL de descarga de la imagen
        userSafetyInfo.image = userImageUrl;  // Actualizar la URL en el objeto userSafetyInfo
        console.log("Imagen del usuario subida correctamente:", userImageUrl);
      }
  
      // Actualizar contraseña en Firebase Authentication
      const userRef = doc(db, "EMPRESAS", ID_company_tax, "USUARIO", uid);  
      const userSnapshot = await getDoc(userRef);
      
      if (!userSnapshot.exists()) {
        throw new Error("El usuario no existe.");
      }
  
      const userAuth = auth.currentUser;  // Obtener el usuario autenticado
      if (userAuth) {
        await updatePassword(userAuth, userSafetyInfo.password);  // Actualizar la contraseña en Firebase Auth
      }
  
      // Actualizar otros datos en Firestore
      await updateDoc(userRef, {
        password:userSafetyInfo.password,
        phone_number: userSafetyInfo.phone_number,
        work_location: userSafetyInfo.work_location.name,
        image: userSafetyInfo.image || userImageUrl,  // Usar la URL de Firebase Storage si está disponible
      });
  
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Datos actualizados correctamente",
        life: 3000,
      });
  
      router.push("/employer/makepay");  // Redirigir a la página principal
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Error al actualizar los datos: ${error.message}`,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{background:getColor(theme,'background')}}>
      <Toast ref={toast} />
      <Card title="Security Questions (nombre del usuario)" style={{ minHeight: "60vh", textAlign: "center",background:getColor(theme,'background'),color:getColor(theme,'text') }}>
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

      <Box sx={{ marginTop: 5, background: getColor(theme, "background"), display: "flex", justifyContent: "flex-end", paddingRight: 5 }}>
        <Button 
          label={loading ? "Guardando..." : "Actualizar"}
          icon={loading ? "pi pi-spin pi-spinner" : null}
          onClick={handleSubmit}
          disabled={loading}
        />
      </Box>

    
    
    </Box>
    
      );
    }
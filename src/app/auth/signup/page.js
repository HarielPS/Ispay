"use client";
import React, { useState, useRef } from "react";
import { Box, Button, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { Toast } from "primereact/toast";
import CompanySignup from "./components/CompanySignup";
import GeneralUserInfo from "./components/GeneralUserInfo";
import UserSafetyInfo from "./components/UserSafetyInfo";
import Company from "@/services/Firebase/models/Company";
import User from "@/services/Firebase/models/User";
import { useRouter } from "next/navigation";
import getColor from "@/themes/colorUtils";
import { useTheme } from "@mui/material";
import { FBQueries } from "@/services/Firebase/Firebase.queries";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // MUI Stepper control
  // Aquí se almacenan los archivos para subir
  const [companyImageFile, setCompanyImageFile] = useState(null);
  const [userImageFile, setUserImageFile] = useState(null);

  // Information for company and user, including profileImg here
  const [companyInformation, setCompanyInformation] = useState({
    ID_company_tax: "",
    company_name: "",
    legal_company_name: "",
    company_headquarters: {
      name: "",
      code: "",
    },
    website: "",
    number_employees: "",
    company_role: [],
    company_description: "",
    company_image: "",
  });

  const [generalUserInformation, setGeneralUserInformation] = useState({
    ID_user: "",
    name: "",
    surname: "",
    ssn: "",
    work_email: "",
    role: "ADMIN",
    ADMIN: true,
  });

  const [userSafetyInfo, setUserSafetyInfo] = useState({
    image: "",
    password: "",
    password_validation: "",
    phone_number: "",
    work_location: "",
  });

  const [errors, setErrors] = useState({
    company_name: "",
    ID_company_tax: "",
    website: "",
    legal_company_name: "",
    number_employees: "",
  });

  // Form validation function
  const validateFields = () => {
    let valid = true;
    let newErrors = { ...errors };
  
    if (!companyInformation.company_name) {
      newErrors.company_name = "El nombre de la empresa es obligatorio.";
      valid = false;
    } else {
      newErrors.company_name = "";
    }
  
    if (!companyInformation.ID_company_tax) {
      newErrors.ID_company_tax = "El ID de la empresa es obligatorio.";
      valid = false;
    } else {
      newErrors.ID_company_tax = "";
    }
  
    if (!companyInformation.website || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(companyInformation.website)) {
      newErrors.website = "Introduce una URL válida (comienza con http:// o https://).";
      valid = false;
    } else {
      newErrors.website = "";
    }
  
    if (!companyInformation.legal_company_name) {
      newErrors.legal_company_name = "El nombre legal de la empresa es obligatorio.";
      valid = false;
    } else {
      newErrors.legal_company_name = "";
    }
  
    setErrors(newErrors);
    return valid;
  };
  

  const handleNext = () => {
    if (validateFields()) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Por favor, completa todos los campos obligatorios.",
        life: 3000,
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    if (validateFields()) {
      console.log("Company Information: ", companyInformation); // Verificar los datos de la empresa
      try {
        const signupResult = await FBQueries.SignupCompany(
          companyInformation,  // Datos de la empresa
          userSafetyInfo, // Datos de usuario
          generalUserInformation,  // Datos del usuario
          companyImageFile,  // Imagen de la empresa
          userImageFile  // Imagen del usuario
        );
  
        if (signupResult.success) {
          toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: signupResult.message,
            life: 2000,
          });
          router.replace("/company/dashboard/home");
          // setTimeout(() => {
          //   router.replace("/company/dashboard/home");
          // }, 2000);
        }
      } catch (error) {
        console.error("Error al registrar:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error al registrar la empresa o el usuario.",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Por favor, completa todos los campos obligatorios.",
        life: 3000,
      });
    }
  };
  
  
  // const handleSubmit = async () => {
  //   setLoading(true);
  //   if (validateFields()) {
  //     const company = new Company(companyInformation);
  //     const user = new User(generalUserInformation, userSafetyInfo);

  //     const signupSuccess = await company.signup(user.toFirebase(), "");
  //     if (signupSuccess) {
  //       setLoading(false);
  //       toast.current.show({
  //         severity: "success",
  //         summary: "Success",
  //         detail: "Company and user registered successfully",
  //         life: 2000,
  //       });
  //       setTimeout(() => {
  //         router.replace("/company/dashboard/home");
  //       }, 2000);
  //     }
  //   } else {
  //     setLoading(false);
  //     setLoading(false);
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Error",
  //       detail: "Please complete all required fields.",
  //       life: 3000,
  //     });
  //   }
  // };

  return (
    <Box sx={{ backgroundColor: getColor(theme, "background"), color: getColor(theme, "text"), minHeight: "100vh", padding: 3 }}>
      <Toast ref={toast} />

      <Stepper activeStep={activeStep} alternativeLabel sx={{ backgroundColor: getColor(theme, "background") }}>
        {["Company Information", "General User Information", "Security Questions"].map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        {activeStep === 0 && (
          <CompanySignup 
          companyInformation={companyInformation} 
          setCompanyInformation={setCompanyInformation}
          companyImageFile={companyImageFile}  
          setCompanyImageFile={setCompanyImageFile} 
          errors={errors}
          setErrors={setErrors}
          />
        )}
        {activeStep === 1 && (
          <GeneralUserInfo 
            generalUserInformation={generalUserInformation} 
            setGeneralUserInformation={setGeneralUserInformation} 
          />
        )}
        {activeStep === 2 && (
          <UserSafetyInfo 
          userSafetyInfo={userSafetyInfo}
          setUserSafetyInfo={setUserSafetyInfo}
          userImageFile={userImageFile}  
          setUserImageFile={setUserImageFile}  
          />
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button 
          onClick={() => setActiveStep((prevStep) => prevStep - 1)} 
          disabled={activeStep === 0} 
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
        >
          Back
        </Button>
        {activeStep === 2 ? (
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{ backgroundColor: theme.palette.success.main, color: "white" }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Finish"}
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            variant="contained"
            sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}

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

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // MUI Stepper control

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

  // Form validation function
  const validateFields = (fields) => {
  for (const key in fields) {
    if (typeof fields[key] === "object" && fields[key] !== null) {
      if (!validateFields(fields[key])) return false;
    } else if (Array.isArray(fields[key])) {
      if (fields[key].length === 0) return false;
    } else {
      if (!fields[key]) return false;
    }
  }
  return true;
  };

  const handleNext = () => {
    // validateFields(getCurrentFormData())
    if (true) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "You must complete all the fields",
        life: 3000,
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (validateFields(getCurrentFormData())) {
      const company = new Company(companyInformation);
      const user = new User(generalUserInformation, userSafetyInfo);

      const signupSuccess = await company.signup(user.toFirebase(), "");
      if (signupSuccess) {
        setLoading(false);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Company and user registered successfully",
          life: 2000,
        });
        setTimeout(() => {
          router.replace("/company/dashboard/home");
        }, 2000);
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "You must complete all the fields",
        life: 3000,
      });
    }
  };

  const getCurrentFormData = () => {
    switch (activeStep) {
      case 0:
        return companyInformation;
      case 1:
        return generalUserInformation;
      case 2:
        return userSafetyInfo;
      default:
        return {};
    }
  };

  const steps = ["Company Information", "General User Information", "Security Questions"];

  return (
    <Box sx={{ backgroundColor: getColor(theme, "background"), color: getColor(theme, "text"), minHeight: "100vh", padding: 3 }}>
      <Toast ref={toast} />

      <Stepper activeStep={activeStep} alternativeLabel sx={{ backgroundColor: getColor(theme, "background") }}>
        {steps.map((label, index) => (
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
          />
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button 
          onClick={handleBack} 
          disabled={activeStep === 0} 
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
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

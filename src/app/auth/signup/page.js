"use client";
import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ScrollPanel } from "primereact/scrollpanel";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Toast } from "primereact/toast";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import CompanySignup from "./components/CompanySignup";
import GeneralUserInfo from "./components/GeneralUserInfo";
import UserSafetyInfo from "./components/UserSafetyInfo";
import Company from "@/services/Firebase/models/Company";
import User from "@/services/Firebase/models/User";
import { SplitButton } from "primereact/splitbutton";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "primereact/hooks";

export default function page() {
  const router = useRouter();
  const toast = useRef(null);
  const stepperRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dataCompanyLocalS, setDataCompanyLocalS] = useLocalStorage(
    null,
    "dataCompany"
  );
  const [dataAdminLocalS, setDataAdminLocalS] = useLocalStorage(
    null,
    "dataAdmin"
  );
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

  const validateFields = (fields) => {
    for (const key in fields) {
      if (typeof fields[key] === "object" && fields[key] !== null) {
        // Si es un objeto, validamos sus propiedades
        if (!validateFields(fields[key])) return false;
      } else if (Array.isArray(fields[key])) {
        // Si es un array, validamos que no esté vacío
        if (fields[key].length === 0) return false;
      } else {
        // Validamos que los campos no estén vacíos
        if (!fields[key]) return false;
      }
    }
    return true;
  };

  const handleNextView = (data) => {
    if (validateFields(data) | 1) {
      stepperRef.current.nextCallback();
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "You must complete all the fields",
        life: 3000,
      });
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    if (validateFields(data)) {
      const company = new Company(companyInformation);
      const user = new User(generalUserInformation, userSafetyInfo);
      console.log(user.toFirebase());

      const signupSuccess = await company.signup(user.toFirebase(), "");
      if (signupSuccess) {
        setLoading(false);
        toast.current.show([
          {
            severity: "info",
            summary: "Info",
            detail: "You're being redirected",
            life: 2000,
          },
          {
            severity: "success",
            summary: "Success",
            detail: "Company and user registered successfully",
            life: 2000,
          },
        ]);
        setDataCompanyLocalS(company.toJSON());
        setDataAdminLocalS(user.toFirebase());

        const checkDataSaved = setInterval(() => {
          const savedCompany = dataCompanyLocalS; // función que recupera los datos guardados
          const savedAdmin = dataAdminLocalS; // función que recupera los datos guardados
          // Si ambos datos están presentes, procede con la redirección
          if (savedCompany && savedAdmin) {
            clearInterval(checkDataSaved); // Detenemos la verificación
            // Espera 2 segundos antes de redirigir
            setTimeout(() => {
              router.replace("/company/dashboard/home");
            }, 2000); // Retraso de 2 segundos
          }
        }, 500); // Comprueba cada 500ms
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

  return (
    <div className="card">
      <Toast ref={toast} />
      <Stepper ref={stepperRef} style={{ flexBasis: "50rem" }} linear>
        <StepperPanel header="Company information">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <ScrollPanel style={{ width: "100%", height: "60vh" }}>
                <CompanySignup
                  companyInformation={companyInformation}
                  setCompanyInformation={setCompanyInformation}
                />
              </ScrollPanel>
            </div>
            <div className="flex pt-4 justify-content-end">
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => handleNextView(companyInformation)}
              />
            </div>
          </div>
        </StepperPanel>
        <StepperPanel header="General user information">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <ScrollPanel style={{ width: "100%", height: "60vh" }}>
                <GeneralUserInfo
                  generalUserInformation={generalUserInformation}
                  setGeneralUserInformation={setGeneralUserInformation}
                />
              </ScrollPanel>
            </div>
            <div className="flex pt-4 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => handleNextView(generalUserInformation)}
              />
            </div>
          </div>
        </StepperPanel>
        <StepperPanel header="Security Questions">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <ScrollPanel style={{ width: "100%", height: "60vh" }}>
                <UserSafetyInfo
                  userSafetyInfo={userSafetyInfo}
                  setUserSafetyInfo={setUserSafetyInfo}
                />
              </ScrollPanel>
            </div>
            <div className="flex pt-4 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Sign up"
                icon="pi pi-check"
                iconPos="right"
                onClick={() => handleSubmit(userSafetyInfo)}
                loading={loading}
              />
            </div>
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}

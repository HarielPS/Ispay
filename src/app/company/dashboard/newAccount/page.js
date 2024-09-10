"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import DetailsSection from "./components/DetailsSection";
import { groupedRoles } from "./helpers/list.roles";
import { useLocalStorage } from "primereact/hooks";
import User from "@/services/Firebase/models/User";
import EmployeeAccount from "@/services/Firebase/models/EmployeeAccounts";
import { useRouter } from "next/navigation";

export default function newAccount() {
  const router = useRouter();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dataCompany_LocalS, setdataCompany_LocalS] = useLocalStorage(
    null,
    "dataCompany"
  );
  const [createDataAccount, setCreateDataAccount] = useState({
    ID_user: "",
    name: "",
    surname: "",
    ssn: "",
    work_email: "",
    role: "",
    min_amount_account: 0,
    max_amount_account: 0,
    start_withdraw_account: "",
    final_withdraw_account: "",
    days_account: [],
    expense_category_account: [],
  });
  const [checked, setChecked] = useState(false);

  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };

  const validateFields = (fields) => {
    for (const key in fields) {
      // Verificamos si es un array y validamos que no esté vacío
      if (Array.isArray(fields[key])) {
        if (fields[key].length === 0) return false;
      } else if (typeof fields[key] === "object" && fields[key] !== null) {
        // Si es un objeto, validamos sus propiedades
        if (!validateFields(fields[key])) return false;
      } else {
        // Validamos que los campos no estén vacíos (para strings, números, etc.)
        if (
          fields[key] === "" ||
          fields[key] === null ||
          fields[key] === undefined
        )
          return false;
      }
    }
    return true;
  };

  const handleCreateAccount = async () => {
    let EAResponse;
    setLoading(true);
    if (validateFields(createDataAccount)) {
      Object.assign(createDataAccount, {
        ADMIN: checked,
        ID_company_tax: dataCompany_LocalS.ID_company_tax,
      });
      if (!checked) {
        //Verifica si tiene que agregar un usuario admin o uno employee
        //Entonces es un admin, modificar por la logica correcta
        const employeeAccount = new EmployeeAccount(createDataAccount);
        EAResponse = await employeeAccount.FB_createUser();
      }
      const user = new User(createDataAccount);
      const userResponse = await user.FB_createUser(); //Falta agregar metodo a la clase user
      if (EAResponse.success && userResponse.success) {
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
        setTimeout(() => {
          router.replace("home");
        }, 2000); // Retraso de 2 segundos
      } else {
        setLoading(false);
        toast.current.show({
          severity: "danger",
          summary: "Error",
          detail: "Try again later",
          life: 3000,
        });
      }
      //-------------------
    } else {
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Complete all fields",
        detail:
          "Check that you have filled out all the fields and the numbers must not be zero.",
        life: 3000,
      });
    }
  };
  useEffect(() => {
    console.log(createDataAccount);
  }, [createDataAccount]);

  const hadleChangeSelectAdmin = (value) => {
    setChecked(value);
    handleChange("role", "ADMIN");
    handleChange("is_admin", value);
  };
  const handleChange = (field, value) => {
    setCreateDataAccount((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  return (
    <Box className="flex align-items-center">
      <Toast ref={toast} />
      <Card title="Create employee account">
        <Box sx={{ width: "100%" }}>
          <ScrollPanel style={{ width: "100%", height: "65vh" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={4}>
                <div className="flex align-items-center">
                  <Checkbox
                    onChange={(e) => hadleChangeSelectAdmin(e.checked)}
                    checked={checked}
                  ></Checkbox>
                  <label htmlFor="ingredient1" className="ml-2">
                    It is an administrator account
                  </label>
                </div>
              </Grid>
              <Grid size={8}></Grid>
              <Grid size={4}>
                <div className="flex-auto">
                  <label htmlFor="ID employee" className="font-bold block mb-2">
                    ID employee
                  </label>
                  <InputText
                    keyfilter="alphanum"
                    placeholder="ID employee"
                    className="w-full"
                    value={createDataAccount.ID_user}
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
                    value={createDataAccount.name}
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
                    value={createDataAccount.surname}
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
                    placeholder="SSN"
                    className="w-full"
                    value={createDataAccount.ssn}
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
                    keyfilter="email"
                    placeholder="Email"
                    className="w-full"
                    value={createDataAccount.work_email}
                    onChange={(e) => handleChange("work_email", e.target.value)}
                  />
                </div>
              </Grid>
              <Grid size={4}>
                <div className="flex-auto">
                  <label htmlFor="role" className="font-bold block mb-2">
                    Role
                  </label>
                  <Dropdown
                    value={createDataAccount.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    options={groupedRoles}
                    optionLabel="label"
                    optionGroupLabel="label"
                    optionGroupChildren="items"
                    optionGroupTemplate={groupedItemTemplate}
                    className="w-full"
                    placeholder={checked ? "ADMIN" : "Select a Role"}
                    disabled={checked}
                  />
                </div>
              </Grid>
              {checked ? (
                <></>
              ) : (
                <DetailsSection
                  createDataAccount={createDataAccount}
                  setCreateDataAccount={setCreateDataAccount}
                />
              )}
            </Grid>
          </ScrollPanel>
          <Grid container>
            <Grid size={2} offset={10}>
              <Button
                label="Create account"
                onClick={handleCreateAccount}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}

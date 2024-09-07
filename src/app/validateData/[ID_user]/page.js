"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Password } from "primereact/password";

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

export default function validate({ params }) {
  const toast = useRef(null);
  const [value, setValue] = useState('');
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
  const [checked, setChecked] = useState(false);

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
      <Card
        title={`Hello ${params.ID_user}, please fill out this form to create your account`}
      >
        <Box sx={{ width: "100%" }}>
          <ScrollPanel style={{ width: "100%", height: "65vh" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
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
                    value={createDataAccount.ID_employee}
                    onChange={(e) =>
                      handleChange("ID_employee", e.target.value)
                    }
                  />
                </div>
              </Grid>
              <Grid size={4}>
                <Password
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  toggleMask
                />
              </Grid>
              <Grid size={4}>
                <Password
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  toggleMask
                />
              </Grid>
              <Grid size={4}>
                <div className="flex-auto">
                  <label htmlFor="name" className="font-bold block mb-2">
                    Name
                  </label>
                  <InputText
                    keyfilter="alpha"
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
                    keyfilter="alpha"
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
                    keyfilter="alpha"
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
            </Grid>
          </ScrollPanel>
          <Grid container>
            <Grid size={2} offset={10}>
              <Button label="Create account" onClick={handleCreateAccount} />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}

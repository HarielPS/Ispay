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
import { InputTextarea } from "primereact/inputtextarea";

import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { ChevronRightIcon } from "primereact/icons/chevronright";
import { countries } from "../helpers/list.countries";
import { numEmployees } from "../helpers/list.numEmployees";
import { groupedMarkets } from "../helpers/list.companyRoles";

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

  useEffect(() => {
    console.log(companyInformation);
  }, [companyInformation]);

  const handleChange = (field, value) => {
    setCompanyInformation((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

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

  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    return (
      <div className="py-2 px-3">
        {companyInformation.company_headquarter ? (
          <span>
            <b>{companyInformation.company_headquarter}</b> selected.
          </span>
        ) : (
          "No country selected."
        )}
      </div>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Card title="Company information" style={{ minHeight: "60vh" }}>
        <Box sx={{ width: "100%", minHeight: "100%" }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ width: "100%", height: "100%" }}
          >
            <Grid size={12}>
              <div className="flex-auto">
                <label htmlFor="Company image" className="font-bold block mb-2">
                  Company image
                </label>
                <InputText
                  placeholder="Company image"
                  className="w-full"
                  value={createDataAccount.ID_employee}
                  onChange={(e) => handleChange("ID_employee", e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label
                  htmlFor="company tax ID"
                  className="font-bold block mb-2"
                >
                  company tax ID
                </label>
                <InputText
                  placeholder="company tax ID"
                  className="w-full"
                  value={companyInformation.ID_company_tax}
                  onChange={(e) =>
                    handleChange("ID_company_tax", e.target.value)
                  }
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label
                  htmlFor="Company's name"
                  className="font-bold block mb-2"
                >
                  Company's name
                </label>
                <InputText
                  placeholder="Company's name"
                  className="w-full"
                  value={companyInformation.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label
                  htmlFor="Legal name of the company"
                  className="font-bold block mb-2"
                >
                  Legal name of the company
                </label>
                <InputText
                  placeholder="Legal name of the company"
                  className="w-full"
                  value={companyInformation.legal_company_name}
                  onChange={(e) =>
                    handleChange("legal_company_name", e.target.value)
                  }
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label
                  htmlFor="Company's headquarters"
                  className="font-bold block mb-2"
                >
                  Company's headquarters
                </label>
                <Dropdown
                  filter
                  value={companyInformation.company_headquarters}
                  onChange={(e) =>
                    handleChange("company_headquarters", e.value)
                  }
                  options={countries}
                  optionLabel="name"
                  placeholder="Select a Country"
                  valueTemplate={selectedCountryTemplate}
                  itemTemplate={countryOptionTemplate}
                  className="w-full"
                  panelFooterTemplate={panelFooterTemplate}
                  dropdownIcon={(opts) => {
                    return opts.iconProps["data-pr-overlay-visible"] ? (
                      <ChevronRightIcon {...opts.iconProps} />
                    ) : (
                      <ChevronDownIcon {...opts.iconProps} />
                    );
                  }}
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label htmlFor="Website" className="font-bold block mb-2">
                  Website
                </label>
                <InputText
                  placeholder="Website"
                  className="w-full"
                  value={companyInformation.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={4}>
              <div className="flex-auto">
                <label
                  htmlFor="number of employees"
                  className="font-bold block mb-2"
                >
                  number of employees
                </label>
                <Dropdown
                  value={companyInformation.number_employees}
                  onChange={(e) =>
                    handleChange("number_employees", e.target.value)
                  }
                  options={numEmployees}
                  optionLabel="name"
                  placeholder="Select a range"
                  className="w-full"
                />
              </div>
            </Grid>
            <Grid size={12}>
              <div className="flex-auto">
                <label
                  htmlFor="Company's description"
                  className="font-bold block mb-2"
                >
                  Role company
                </label>
                <MultiSelect
                  filter
                  value={companyInformation.company_role}
                  options={groupedMarkets}
                  onChange={(e) => handleChange("company_role", e.value)}
                  optionLabel="label"
                  optionGroupLabel="label"
                  optionGroupChildren="items"
                  optionGroupTemplate={groupedItemTemplate}
                  placeholder="Select Role company"
                  display="chip"
                  className="w-full"
                />
              </div>
            </Grid>
            <Grid size={12}>
              <div className="flex-auto">
                <label
                  htmlFor="Company's description"
                  className="font-bold block mb-2"
                >
                  Company's description
                </label>
                <InputTextarea
                  value={companyInformation.company_description}
                  onChange={(e) =>
                    handleChange("company_description", e.target.value)
                  }
                  rows={5}
                  cols={30}
                  className="w-full"
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}

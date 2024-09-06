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

export default function UserSafetyInfo({ userSafetyInfo, setUserSafetyInfo }) {
  const toast = useRef(null);
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
    console.log(userSafetyInfo);
  }, [userSafetyInfo]);

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
  return (
    <>
      <Toast ref={toast} />
      <Card title="Security Questions" style={{ minHeight: "60vh" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={12}>
              <div className="flex-auto">
                <label htmlFor="Profile image" className="font-bold block mb-2">
                  Profile image
                </label>
                <InputText
                  placeholder="Profile image"
                  className="w-full"
                  value={userSafetyInfo.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={4}>
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
            <Grid size={4}>
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
            <Grid size={4}>
              <div className="flex-auto">
                <label htmlFor="Password" className="font-bold block mb-2">
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
        </Box>
      </Card>
    </>
  );
}

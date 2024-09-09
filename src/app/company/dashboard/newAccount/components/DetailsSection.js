"use client";
import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import Grid from "@mui/material/Grid2";
import { InputMask } from "primereact/inputmask";
import { MultiSelect } from "primereact/multiselect";
import { Tooltip } from "primereact/tooltip";
import { expenseCategories } from "../helpers/list.expenseCategories";
import { Days } from "../helpers/list.days";
import { Calendar } from 'primereact/calendar';

export default function DetailsSection({
  createDataAccount,
  setCreateDataAccount,
}) {
  const handleChange = (field, value) => {
    setCreateDataAccount((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };
  return (
    <>
      <Divider />
      <Grid size={4}>
        <div className="flex-auto">
          <label htmlFor="min_amount_account" className="font-bold block mb-2">
            Min amount in account
          </label>
          <InputNumber
            inputId="currency-us"
            value={createDataAccount.min_amount_account}
            onValueChange={(e) => handleChange("min_amount_account", e.value)}
            mode="currency"
            currency="USD"
            suffix=" USTD"
            locale="en-US"
            className="w-full"
          />
        </div>
      </Grid>
      <Grid size={4}>
        <div className="flex-auto">
          <label htmlFor="max_amount_account" className="font-bold block mb-2">
            maximum amount to deposit
          </label>
          <InputNumber
            inputId="currency-us"
            value={createDataAccount.max_amount_account}
            onValueChange={(e) => handleChange("max_amount_account", e.value)}
            mode="currency"
            currency="USD"
            suffix=" USTD"
            locale="en-US"
            className="w-full"
          />
        </div>
      </Grid>
      <Grid size={4}></Grid>
      <Grid size={4}>
        <div className="flex-auto">
          <label htmlFor="start_withdraw_account" className="font-bold block mb-2">
            Start withdrawal time
          </label>
          <Calendar
            id="calendar-timeonly"
            placeholder="--:--"
            value={createDataAccount.start_withdraw_account}
            onChange={(e) => handleChange("start_withdraw_account", e.target.value)}
            timeOnly
            className="w-full"
          />
        </div>
      </Grid>
      <Grid size={4}>
        <div className="flex-auto">
          <label htmlFor="final_withdraw_account" className="font-bold block mb-2">
            Final withdrawal time
          </label>
          <Calendar
            id="calendar-timeonly"
            placeholder="--:--"
            value={createDataAccount.final_withdraw_account}
            onChange={(e) => handleChange("final_withdraw_account", e.target.value)}
            timeOnly
            className="w-full"
          />
        </div>
      </Grid>
      <Grid size={4}>
        <div className="flex-auto">
          <label htmlFor="days_account" className="font-bold block mb-2">
            approved days
          </label>
          <MultiSelect
            value={createDataAccount.days_account}
            onChange={(e) => handleChange("days_account", e.value)}
            options={Days}
            optionLabel="name"
            placeholder="Select day or days"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
      </Grid>
      <Grid size={4}>
        <div className="flex-auto">
          <label htmlFor="expense_category_account" className="font-bold block mb-2">
            approved categories
          </label>
          <MultiSelect
            filter
            value={createDataAccount.expense_category_account}
            options={expenseCategories}
            onChange={(e) => handleChange("expense_category_account", e.value)}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            optionGroupTemplate={groupedItemTemplate}
            placeholder="Select Expenses"
            display="chip"
            className="w-full md:w-20rem"
          />
        </div>
      </Grid>
    </>
  );
}

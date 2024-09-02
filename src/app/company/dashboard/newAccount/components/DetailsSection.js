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
          <label htmlFor="minAmount" className="font-bold block mb-2">
            Min amount in account
          </label>
          <InputNumber
            inputId="currency-us"
            value={createDataAccount.min_amount}
            onValueChange={(e) => handleChange("min_amount", e.value)}
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
          <label htmlFor="maxAmount" className="font-bold block mb-2">
            maximum amount to deposit
          </label>
          <InputNumber
            inputId="currency-us"
            value={createDataAccount.max_amount}
            onValueChange={(e) => handleChange("max_amount", e.value)}
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
          <label htmlFor="startWithdraw" className="font-bold block mb-2">
            Start withdrawal time
          </label>
          <Calendar
            id="calendar-timeonly"
            placeholder="--:--"
            value={createDataAccount.start_withdraw}
            onChange={(e) => handleChange("start_withdraw", e.target.value)}
            timeOnly
            className="w-full"
          />
        </div>
      </Grid>
      <Grid size={4}>
        <div className="flex-auto">
          <label htmlFor="finalWithdraw" className="font-bold block mb-2">
            Final withdrawal time
          </label>
          <Calendar
            id="calendar-timeonly"
            placeholder="--:--"
            value={createDataAccount.final_withdraw}
            onChange={(e) => handleChange("final_withdraw", e.target.value)}
            timeOnly
            className="w-full"
          />
        </div>
      </Grid>
      <Grid size={4}>
        <div className="flex-auto">
          <label htmlFor="approvedDays" className="font-bold block mb-2">
            approved days
          </label>
          <MultiSelect
            value={createDataAccount.days}
            onChange={(e) => handleChange("days", e.value)}
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
          <label htmlFor="aprovvedCategories" className="font-bold block mb-2">
            approved categories
          </label>
          <MultiSelect
            filter
            value={createDataAccount.expense_category}
            options={expenseCategories}
            onChange={(e) => handleChange("expense_category", e.value)}
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

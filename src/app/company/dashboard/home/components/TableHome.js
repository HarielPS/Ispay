"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { SplitButton } from "primereact/splitbutton";
import { Tag } from "primereact/tag";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

export default function TableHome() {
  const [rowClick, setRowClick] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const items = [
    {
      label: "Deposit",
      icon: "pi pi-directions",
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Updated",
          detail: "Data Updated",
        });
      },
    },
  ];
  const [products, setProducts] = useState([
    {
      id: "1000",
      code: "D453SY0Q1",
      name: "Berenga",
      surname: "Barrera",
      email: "juanito@ispay.com",
      last_signin: new Date(2024, 9, 7),
      last_faucet: new Date(2024, 9, 7),
      last_movement: new Date(2024, 9, 7),
      account: "0x49faC9237f1e4364F58486677BAEf38229A3EF5E",
      balance: "1",
      area: "avion",
      image: "bamboo-watch.jpg",
      description: "Product Description",
      price: 65,
      min_amount_account: 10,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      image:
        "https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png",
      work_location: { name: "Argentina", code: "AR" },
    },
    {
      id: "1000",
      code: "D453SY0Q1",
      name: "Daniel ",
      surname: "Barrera",
      email: "juanito@ispay.com",
      last_signin: new Date(2024, 9, 7),
      last_faucet: new Date(2024, 9, 7),
      last_movement: new Date(2024, 9, 7),
      account: "0x49faC9237f1e4364F58486677BAEf38229A3EF5E",
      balance: "1",
      area: "avion",
      image: "bamboo-watch.jpg",
      description: "Product Description",
      price: 65,
      min_amount_account: 10,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      image:
        "https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png",
      work_location: { name: "United State", code: "US" },
    },
    {
      id: "1000",
      code: "D453SY0Q1",
      name: "juanito ",
      surname: "Barrera",
      email: "juanito@ispay.com",
      last_signin: new Date(2024, 9, 7),
      last_faucet: new Date(2024, 9, 7),
      last_movement: new Date(2024, 9, 7),
      account: "0x49faC9237f1e4364F58486677BAEf38229A3EF5E",
      balance: "1",
      area: "transport",
      image: "bamboo-watch.jpg",
      description: "Product Description",
      price: 65,
      min_amount_account: 10,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      image:
        "https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png",
      work_location: { name: "Germany", code: "DE" },
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo",
      surname: "Watch",
      email: "bambo@ispay.com",
      last_signin: new Date(2024, 9, 7),
      last_faucet: new Date(2024, 9, 7),
      last_movement: new Date(2024, 9, 7),
      account: "0x49faC9237f1e4364F584866777BAEf38229859F5",
      balance: "12",
      area: "transport",
      image: "bamboo-watch.jpg",
      description: "Product Description",
      price: 65,
      min_amount_account: 10,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      image:
        "https://primefaces.org/cdn/primereact/images/avatar/ivanmagalhaes.png",
      work_location: { name: "Mexico", code: "MX" },
    },
  ]);
  const [filters, setFilters] = useState({
    "work_location.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
    code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    surname: { value: null, matchMode: FilterMatchMode.CONTAINS },
    last_signin: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    last_faucet: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    last_movement: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    account: { value: null, matchMode: FilterMatchMode.CONTAINS },
    area: { value: null, matchMode: FilterMatchMode.CONTAINS },
    balance: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const onFilterChange = (e, field) => {
    const value = e.value ? new Date(e.value) : null;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: { value, matchMode: FilterMatchMode.DATE_IS },
    }));
  };

  const clearFilter = (field) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: {
        value: null,
        matchMode: prevFilters[field].matchMode,
        operator: prevFilters[field].operator,
      },
    }));
  };
  const DateFilter = ({ field }) => (
    <Calendar
      onChange={(e) => onFilterChange(e, field)}
      dateFormat="yy-mm-dd"
      showOnFocus
      placeholder="Select a date"
    />
  );

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">
        Accounts in your organitation
      </span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );
  const UserColumn = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <img alt={option.name} src={option.image} width="32" />
        <div>
          {" "}
          {/*//className="flex flex-column"*/}
          <span>{option.name.split(" ")[0] + " "}</span>
          <span>{option.surname.split(" ")[0]}</span>
        </div>
      </div>
    );
  };

  const CountryColumn = (option) => {
    return (
      <div className="flex flex-column align-items-start gap-2">
        <span
          className={"flag flag-" + option.work_location.code.toLowerCase()}
          style={{ width: "22px", height: "15px" }}
        />
        <span style={{ fontSize: ".8rem" }}> {option.work_location.code}</span>
      </div>
    );
  };

  const AccountColumn = (option) => {
    const fistPart = option.account.slice(0, 5);
    const lastPart = option.account.slice(-4);
    return (
      <div className="flex align-items-start gap-2" style={{ width: "7rem" }}>
        <span
          style={{
            maxWidth: "fit-content",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {fistPart + "..." + lastPart}
        </span>
      </div>
    );
  };
  const DateColumn = (rowData, field) => {
    const value = field
      .split(".")
      .reduce((acc, part) => acc && acc[part], rowData);
    //const date = value ? new Date(value) : null;
    const date = value instanceof Date ? value : new Date(value);
    return (
      <div className="flex flex-column align-items-start gap-2">
        <span>{date ? date.toLocaleDateString() : "--"}</span>
        <span>{date ? date.toLocaleTimeString() : "--"}</span>
      </div>
    );
  };

  const OptionColumn = (data) => {
    return (
      <div className="flex flex-column align-items-start gap-2">
        <SplitButton
          label="Deposit"
          icon="pi pi-directions"
          onClick={() => alert("Seleccionado")}
          model={items}
        />
      </div>
    );
  };
  const BalanceColumn = (data) => {
    return (
      <Tag
        severity={data.balance < data.min_amount_account ? "danger" : "success"}
      >
        <div className="flex flex-column align-items-start gap-2">
          {data.balance + " ETH"}
        </div>
      </Tag>
    );
  };

  useEffect(() => {
    console.log(selectedProducts);
  }, [selectedProducts]);
  return (
    <DataTable
      value={products}
      header={header}
      stripedRows
      tableStyle={{ width: "100vw" }}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      filterDisplay="row"
      filters={filters}
      selectionMode={rowClick ? null : "checkbox"}
      selection={selectedProducts}
      onSelectionChange={(e) => setSelectedProducts(e.value)}
      scrollable
      scrollHeight="80vh"
      emptyMessage="No accounts created."
      removableSort
    >
      {/* <Column
        selectionMode="multiple"
        headerStyle={{ width: "3rem" }}
        style={{ minWidth: "5rem" }}
      /> */}
      <Column
        //field="name"
        body={UserColumn}
        header="Name"
        filter
        filterField="name"
        filterPlaceholder="Search"
        style={{ minWidth: "12rem" }}
        //style={{ maxWidth: "100px" }}
      />
      <Column
        field="work_location.name"
        body={CountryColumn}
        header="Country"
        sortable
        style={{ maxWidth: "100px" }}
        //filter
        //filterPlaceholder="Country"
      />
      <Column
        //field="last_signin"
        body={(rowData) => DateColumn(rowData, "last_signin")}
        header="last signin"
        filter
        filterField="last_signin"
        style={{ minWidth: "14rem" }}
        filterElement={<DateFilter field="last_signin" />}
        //style={{ maxWidth: "120px" }}
      />
      <Column
        field="area"
        header="area"
        filter
        filterPlaceholder="Search"
        style={{ minWidth: "12rem" }}
        //style={{ width: "100px" }}
      />

      <Column
        //field="last_faucet"
        body={(rowData) => DateColumn(rowData, "last_faucet")}
        header="last faucet"
        filter
        filterField="last_faucet"
        style={{ minWidth: "14rem" }}
        filterElement={<DateFilter field="last_faucet" />}
        //style={{ maxWidth: "120px" }}
      />
      <Column
        //field="last_faucet"
        body={(rowData) => DateColumn(rowData, "last_movement")}
        header="last movement"
        filter
        filterField="last_movement"
        style={{ minWidth: "14rem" }}
        filterElement={<DateFilter field="last_movement" />}
        //style={{ maxWidth: "120px" }}
      />
      <Column
        header="account"
        body={AccountColumn}
        style={{ maxWidth: "90px" }}
      />
      <Column body={BalanceColumn} header="balance" field="balance" sortable />
      <Column body={OptionColumn} header="Options" />
    </DataTable>
  );
}
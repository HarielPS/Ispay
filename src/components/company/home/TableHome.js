import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import UserColumn from "./Table/UserColumn";

export default function TableHome() {
  const [rowClick, setRowClick] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [products, setProducts] = useState([
    {
      id: "1000",
      code: "D453SY0Q1",
      name: "Berenga ",
      surname: "Barrera",
      email: "juanito@ispay.com",
      lastsignin: "01/09/24 12:00pm",
      lastfaucet: "01/09/24 12:00pm",
      account: "0x49faC9237f1e4364F58486677BAEf38229A3EF5E",
      balance: "1",
      area: "avion",
      image: "bamboo-watch.jpg",
      description: "Product Description",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      image:
        "https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png",
    },
    {
      id: "1000",
      code: "D453SY0Q1",
      name: "Daniel ",
      surname: "Barrera",
      email: "juanito@ispay.com",
      lastsignin: "01/09/24 12:00pm",
      lastfaucet: "01/09/24 12:00pm",
      account: "0x49faC9237f1e4364F58486677BAEf38229A3EF5E",
      balance: "1",
      area: "avion",
      image: "bamboo-watch.jpg",
      description: "Product Description",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      image:
        "https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png",
    },
    {
      id: "1000",
      code: "D453SY0Q1",
      name: "juanito ",
      surname: "Barrera",
      email: "juanito@ispay.com",
      lastsignin: "01/09/24 12:00pm",
      lastfaucet: "01/09/24 12:00pm",
      account: "0x49faC9237f1e4364F58486677BAEf38229A3EF5E",
      balance: "1",
      area: "transport",
      image: "bamboo-watch.jpg",
      description: "Product Description",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      image:
        "https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png",
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo",
      surname: "Watch",
      email: "bambo@ispay.com",
      lastsignin: "01/09/24 12:00pm",
      lastfaucet: "01/09/24 12:00pm",
      account: "0x49faC9237f1e4364F584866777BAEf38229859F5",
      balance: "12",
      area: "transport",
      image: "bamboo-watch.jpg",
      description: "Product Description",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      image:
        "https://primefaces.org/cdn/primereact/images/avatar/ivanmagalhaes.png",
    },
  ]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastsignin: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    lastfaucet: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    account: { value: null, matchMode: FilterMatchMode.CONTAINS },
    area: { value: null, matchMode: FilterMatchMode.CONTAINS },
    balance: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
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
        <span>{option.name + "" + option.surname}</span>
      </div>
    );
  };

  const AccountColumn = (option) => {
    return (
      <div className="flex align-items-center gap-2" style={{ width: "7rem" }}>
        <span
          style={{
            maxWidth: "fit-content",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {option.account}
        </span>
      </div>
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
      tableStyle={{ minWidth: "50rem" }}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      filterDisplay="row"
      filters={filters}
      selectionMode={rowClick ? null : "checkbox"}
      selection={selectedProducts}
      onSelectionChange={(e) => setSelectedProducts(e.value)}
    >
      <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
      <Column
        field="code"
        header="Code"
        filter
        filterPlaceholder="Search by ID"
      ></Column>
      <Column
        //field="name"
        body={UserColumn}
        header="Name"
        filter
        filterPlaceholder="Search by name"
      ></Column>
      <Column
        field="email"
        header="email"
        filter
        filterPlaceholder="Search by email"
      ></Column>
      <Column
        field="lastsignin"
        header="last signin"
        filter
        filterPlaceholder="Search by name"
      ></Column>
      <Column field="area" header="area" filter></Column>

      <Column
        field="lastfaucet"
        header="last faucet"
        filter
        filterPlaceholder="Search by name"
      ></Column>
      <Column header="account" body={AccountColumn} filter
        filterPlaceholder="Search by account"></Column>
      <Column field="balance" header="balance" sortable filter></Column>
    </DataTable>
  );
}

"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Button,
  Avatar,
  InputBase,
  Box,
  IconButton,
} from "@mui/material";
import { Dialog } from "primereact/dialog";
import { Refresh } from "@mui/icons-material"; 
import getColor from "@/themes/colorUtils";
import { useTheme } from "@mui/material";

export default function AccountsTable() {
  const [search, setSearch] = useState({
    name: "",
    email: "",
    lastSignin: "",
    area: "",
    lastFaucet: "",
    account: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");

  const theme = useTheme();

// datos
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
      name: "Bambooz",
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

  const handleSearch = (event, field) => {
    setSearch({ ...search, [field]: event.target.value });
  };

  const filteredProducts = products.filter((product) => {
    const fullName = `${product.name} ${product.surname}`.toLowerCase(); // Concatenamos nombre y apellido
    return (
      fullName.includes(search.name.toLowerCase()) &&
      product.email.toLowerCase().includes(search.email.toLowerCase()) &&
      product.last_signin
        .toLocaleDateString()
        .includes(search.lastSignin.toLowerCase()) &&
      product.area.toLowerCase().includes(search.area.toLowerCase()) &&
      product.last_faucet
        .toLocaleDateString()
        .includes(search.lastFaucet.toLowerCase()) &&
      product.account.toLowerCase().includes(search.account.toLowerCase())
    );
  });
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openModal = (account) => {
    setSelectedAccount(account);
    setModalVisible(true);
  };

  const transferir = () => {
    console.log(`Transferir ${transferAmount} a ${selectedAccount.account}`);
    setModalVisible(false);
  };

  const refreshTable = () => {
    setSearch({
      name: "",
      email: "",
      lastSignin: "",
      area: "",
      lastFaucet: "",
      account: "",
    });
    setPage(0);
  };

  return (
    <>
      {/* Title */}
      <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Accounts in your organization</h2>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton onClick={refreshTable} color="primary">
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          background: getColor(theme, "background3"),
        }}
      >
        {/* Table Component */}
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Last Sign-in</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Last Faucet</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <TextField
                    label="Search by Name"
                    value={search.name}
                    onChange={(e) => handleSearch(e, "name")}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Search by Email"
                    value={search.email}
                    onChange={(e) => handleSearch(e, "email")}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Search by Last Sign-in"
                    value={search.lastSignin}
                    onChange={(e) => handleSearch(e, "lastSignin")}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Search by Area"
                    value={search.area}
                    onChange={(e) => handleSearch(e, "area")}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Search by Last Faucet"
                    value={search.lastFaucet}
                    onChange={(e) => handleSearch(e, "lastFaucet")}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Search by Account"
                    value={search.account}
                    onChange={(e) => handleSearch(e, "account")}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow hover key={product.id}>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={product.image}
                          alt={product.name}
                          sx={{ marginRight: 1 }}
                        />
                        {product.name} {product.surname}
                      </Box>
                    </TableCell>
                    <TableCell>{product.email}</TableCell>
                    <TableCell>
                      {product.last_signin.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{product.area}</TableCell>
                    <TableCell>
                      {product.last_faucet.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div
                        style={{
                          maxWidth: "7rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.account}
                      </div>
                    </TableCell>
                    <TableCell>{product.balance}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => openModal(product)}
                      >
                        Depositar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Transfer Modal */}
      <Dialog
        header="Transferencia"
        visible={modalVisible}
        style={{ width: "400px" }}
        onHide={() => setModalVisible(false)}
      >
        {selectedAccount && (
          <>
            <div>
              <span>
                <b>Nombre:</b> {selectedAccount.name} {selectedAccount.surname}
              </span>
            </div>
            <div>
              <span>
                <b>Wallet:</b> {selectedAccount.account}
              </span>
            </div>
            <div style={{ marginTop: "20px" }}>
              <InputBase
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Ingrese el monto"
                fullWidth
                sx={{ border: "1px solid #ccc", padding: "10px" }}
              />
            </div>
            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <Button variant="contained" color="primary" onClick={transferir}>
                Transferir
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}

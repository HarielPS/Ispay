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
import { Refresh } from "@mui/icons-material"; // Icon for the refresh button
import getColor from "@/themes/colorUtils";
import { useTheme } from "@mui/material";

export default function AccountsTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");

  const theme = useTheme();

  // Sample data
  const [products, setProducts] = useState([
    {
      id: "1000",
      code: "D453SY0Q1",
      name: "Berenga",
      surname: "Barrera",
      email: "juanito@ispay.com",
      last_signin: new Date(2024, 9, 7),
      last_faucet: new Date(2024, 9, 7),
      account: "0x49faC9237f1e4364F58486677BAEf38229A3EF5E",
      balance: "1",
      area: "avion",
      image: "https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png",
    },
    // Add more product objects...
  ]);

  // Search and filter function
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.email.toLowerCase().includes(search.toLowerCase())
  );

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
    // Logic for refreshing the table, you can re-fetch data or reset filters
    setSearch(""); // Clearing the search input as an example
    setPage(0); // Resetting the page
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
          <TextField
            variant="outlined"
            label="Search by Name or Email"
            value={search}
            onChange={handleSearch}
            sx={{ width: "300px" }}
          />
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

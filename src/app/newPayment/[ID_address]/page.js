"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Card } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const networks = [
  { label: "Ethereum", value: "ethereum" },
  { label: "Binance Smart Chain", value: "binance" },
  { label: "Polygon", value: "polygon" },
  { label: "Solana", value: "solana" },
];

export default function PaymentComponent({params}) {
  console.log(params.ID_address)
  const theme = useTheme();
  const [network, setNetwork] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [connectedAddress, setConnectedAddress] = useState(""); // Almacena la dirección conectada
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const contractABI = [
    "function swap(address inputToken, uint256 amount, address targetToken, bytes recipient, bool withdraw) public",
  ];

  // Conectar MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Solicitar acceso a MetaMask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0]; // Obtener la primera cuenta conectada
        setConnectedAddress(address); // Guardar la dirección conectada

        // Crear proveedor y signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
      } catch (error) {
        console.error("Error al conectarse a MetaMask:", error);
      }
    } else {
      console.error("MetaMask no está instalado.");
    }
  };

  useEffect(() => {
    if (signer && contractAddress) {
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contractInstance);
    }
  }, [signer, contractAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contract) {
      console.error("No se ha inicializado el contrato.");
      return;
    }

    try {
      const recipient = "0x0000000000000000000000000000000000000000"; // Destinatario ejemplo
      const targetToken = "0x0000000000000000000000000000000000000000"; // Token objetivo ejemplo

      const tx = await contract.swap(
        network === "ethereum" ? "0x..." : "0x...", // Dirección del token de entrada según la red
        ethers.utils.parseEther(amount),
        targetToken,
        ethers.utils.arrayify(recipient),
        true
      );

      await tx.wait();
      console.log(`Transacción exitosa: ${tx.hash}`);
    } catch (error) {
      console.error("Error al realizar la transacción:", error);
    }
  };

  return (
    <div style={{ background: "#FFF" }}>
      <Card sx={{ maxWidth: 400, margin: "auto", mt: 4, p: 3, boxShadow: 3 }} style={{background:"#FFF"}}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Make payment on Blockchain
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }} >
            <label htmlFor="network">Red de Blockchain</label>
            <Dropdown
              id="network"
              value={network}
              options={networks}
              onChange={(e) => setNetwork(e.value)}
              placeholder="Selecciona una red"
              style={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="contractAddress">
              Dirección del Contrato Inteligente
            </label>
            <InputText
              id="contractAddress"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="0x..."
              style={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="amount">Cantidad</label>
            <InputText
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              style={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="connectedAddress">Dirección Conectada</label>
            <InputText
              id="connectedAddress"
              value={connectedAddress}
              disabled
              placeholder="Conéctate a MetaMask"
              style={{ width: "100%" }}
            />
          </Box>
          <Button
            label="Conectar MetaMask"
            className="w-full mb-2"
            onClick={connectWallet}
          />
          <Button type="submit" label="Hacer Pago" className="w-full" />
        </form>
      </Card>
    </div>
  );
}

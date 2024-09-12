import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Grid, Box, IconButton, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Ícono de papelera
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PaymentForm = () => {
  const theme = useTheme();
  const [showQR, setShowQR] = useState(false);
  const [useWalletInput, setUseWalletInput] = useState(false);
  const [walletDestino, setWalletDestino] = useState('');
  const [monto, setMonto] = useState('');
  const [errorMonto, setErrorMonto] = useState('');
  const [nombre, setNombre] = useState('Juan Carlos'); // Solo lectura, simula bajado de la BD
  const [walletProviene, setWalletProviene] = useState('0xfedcba0987654321'); // Solo lectura
  const [descripcion, setDescripcion] = useState('');
  const [errorDescripcion, setErrorDescripcion] = useState('');
  const [maxAmount, setMaxAmount] = useState(1000); // Simula límite bajado de la BD
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);
  const [qrToken, setQrToken] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [transactionModal, setTransactionModal] = useState({ open: false, success: false });

  // Generar un token aleatorio
  const generateToken = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Manejador para generar el token del QR cada 20 segundos
  const handleQRToggle = () => {
    if (!showQR) {
      setQrToken(generateToken());
      const intervalId = setInterval(() => {
        setQrToken(generateToken());
      }, 20000); // Genera un nuevo token cada 20 segundos
      setTimerId(intervalId);
    }
    setShowQR(true);
    setUseWalletInput(false);
  };

  // Detener la generación del QR al cambiar de opción
  const stopQrGeneration = () => {
    if (timerId) {
      clearInterval(timerId);
    }
    setQrToken(null);
    setTimerId(null);
  };

  // Manejador para mostrar el input de wallet destino
  const handleWalletInputToggle = () => {
    stopQrGeneration();
    setUseWalletInput(true);
    setShowQR(false);
  };

  // Validación del campo 'monto'
  const handleMontoChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value === '') {
      setMonto('');
      setErrorMonto('Debe ingresar un número válido');
    } else if (parseFloat(value) <= 0) {
      setMonto('');
      setErrorMonto('El monto debe ser mayor a 0');
    } else if (parseFloat(value) > maxAmount) {
      setMonto(value);
      setErrorMonto(`El monto no debe superar los ${maxAmount}`);
    } else {
      setMonto(value);
      setErrorMonto('');
    }
  };

  // Validación del campo 'descripcion'
  const handleDescripcionChange = (e) => {
    const value = e.target.value;
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount > 10 || value.length > 25) {
      setDescripcion(value.slice(0, 25));
      setErrorDescripcion('Máximo 10 palabras o 25 caracteres');
    } else if (value.trim() === '') {
      setDescripcion('');
      setErrorDescripcion('El campo concepto es obligatorio');
    } else {
      setDescripcion(value);
      setErrorDescripcion('');
    }
  };

  // Habilitar botón de pago solo si los campos son válidos
  useEffect(() => {
    if (parseFloat(monto) > 0 && !errorMonto && descripcion && !errorDescripcion) {
      setIsPaymentEnabled(true);
    } else {
      setIsPaymentEnabled(false);
    }
  }, [monto, descripcion, errorMonto, errorDescripcion]);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(walletProviene);
    alert('Dirección de wallet copiada');
  };

  // Simular transacción con wallet destino
  const handleWalletTransaction = () => {
    // Aquí iría la lógica para validar la wallet
    const success = walletDestino.length === 15; // Simulamos que la wallet es válida
    setTransactionModal({ open: true, success });
  };

  // Cerrar el modal de resultado de la transacción
  const closeTransactionModal = () => {
    setTransactionModal({ open: false, success: false });
    // Si fue exitosa la transacción, limpiar los campos
    if (transactionModal.success) {
      setMonto('');
      setDescripcion('');
      setWalletDestino('');
      setShowQR(false);
      setUseWalletInput(false);
    }
  };

  // Botón de cancelación de modo
  const handleCancelMode = () => {
    setShowQR(false);
    setUseWalletInput(false);
    stopQrGeneration();
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: getColor(theme, 'background'),
        padding: '2rem',

      }}
    >
      <Grid container sx={{ maxWidth: 1000, backgroundColor: getColor(theme, 'text2'), borderRadius: '8px', padding: '2rem' }}>
        <Grid item xs={10}>
          <Typography component="h1" variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
            Formulario de Pago
          </Typography>
        </Grid>

        <Grid container spacing={2}>
          {/* Campo Monto */}
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Monto"
              variant="outlined"
              value={monto}
              onChange={handleMontoChange}
              error={!!errorMonto}
              helperText={errorMonto || ''}
              inputProps={{ step: '0.01', min: 0.01, type: 'number' }} // Permitir decimales
            />
          </Grid>

          {/* Nombre (solo lectura) */}
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={nombre}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Wallet de origen (solo lectura) */}
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Wallet de origen"
              variant="outlined"
              value={walletProviene}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleCopyWallet}>
                    <ContentCopyIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          {/* Concepto */}
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Concepto"
              variant="outlined"
              value={descripcion}
              onChange={handleDescripcionChange}
              error={!!errorDescripcion}
              helperText={errorDescripcion || ''}
            />
          </Grid>

          {/* Botones para seleccionar Wallet o QR */}
          <Grid item xs={5}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleWalletInputToggle}
              disabled={!isPaymentEnabled}
            >
              Usar Wallet de destino
            </Button>
          </Grid>

          <Grid item xs={5}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleQRToggle}
              disabled={!isPaymentEnabled}
            >
              Usar QR para escanear
            </Button>
          </Grid>

          {/* Botón para cancelar el modo con ícono de papelera */}
          {(showQR || useWalletInput) && (
            <Grid item xs={1} sx={{ display: 'flex',alignItems:'center', textAlign: 'center'}}>
              <IconButton onClick={handleCancelMode} sx={{ width: '100%', height: '100%' }}>
                <DeleteIcon sx={{ fontSize: 26 }} />
              </IconButton>
            </Grid>

          )}

          {/* Mostrar QR o Input de Wallet de destino */}
          {showQR && (
            <Grid item xs={10} sx={{ textAlign: 'center', mt: 2 }}>
              <QRCodeSVG value={`wallet:${walletProviene}|token:${qrToken}`} size={200} />
            </Grid>
          )}

          {useWalletInput && (
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Wallet de destino"
                variant="outlined"
                value={walletDestino}
                onChange={(e) => setWalletDestino(e.target.value)}
                inputProps={{ maxLength: 15 }}
                error={walletDestino.length !== 15}
                helperText={walletDestino.length !== 15 ? 'Debe tener 15 caracteres' : ''}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: isPaymentEnabled && walletDestino.length === 15 ? '#00f' : '#e0e0e0', color: isPaymentEnabled && walletDestino.length === 15 ? '#fff' : '#000', padding: '15px 0', mt: 2 }}
                disabled={!isPaymentEnabled || walletDestino.length !== 15}
                onClick={handleWalletTransaction}
              >
                Pagar
              </Button>
            </Grid>
          )}

        </Grid>

        {/* Modal de Transacción */}
        <Dialog open={transactionModal.open} onClose={closeTransactionModal}>
          <DialogTitle>{transactionModal.success ? "Transacción Exitosa" : "Error en la Transacción"}</DialogTitle>
          <DialogContent>
            {transactionModal.success ? (
              <Typography variant="h6">La transacción se ha completado correctamente.</Typography>
            ) : (
              <Typography variant="h6">Hubo un error en la transacción, inténtelo de nuevo.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeTransactionModal}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
};

export default PaymentForm;

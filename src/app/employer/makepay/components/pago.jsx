import React from 'react';
import { TextField,Typography, Button, Grid, Checkbox, FormControlLabel, Box } from '@mui/material';
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';

const PaymentForm = () => {
    const theme=useTheme();
    const transaccionData = {
        walletDestino: '0x1234567890abcdef',
        monto: '100',
        walletProviene: '0xfedcba0987654321',
        token: 'ETH',
        descripcion: 'Pago por servicios',
      };
    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", backgroundColor: getColor(theme, 'background') }}>
          <Grid container sx={{ height: "100vh", backgroundColor: getColor(theme, 'background') }}>
          <Grid
              item
              xs={12}
              sm={4}
              sx={{ backgroundColor: getColor(theme, 'background'), padding: "2rem", borderRadius: "0", height: "100vh" }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                  Formulario de Pago
                </Typography>
    
                <form style={{ width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Amount"
                        variant="outlined"
                        InputProps={{
                          startAdornment: <i className="fas fa-credit-card" />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        variant="outlined"
                        defaultValue="Juan Carlos"
                        InputProps={{
                          startAdornment: <i className="fas fa-user" />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="wallet"
                        variant="outlined"
                        defaultValue="Flores Guzman"
                        InputProps={{
                          startAdornment: <i className="fas fa-user" />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="adress company"
                        variant="outlined"
                        defaultValue="jcfloresguz@gmail.com"
                        InputProps={{
                          startAdornment: <i className="fas fa-envelope" />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: '#00f',
                          color: '#fff',
                          padding: '15px 0',
                          mt: 2,
                        }}
                      >
                        Pagar
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>

            {/* <Grid
              item
              xs={12}
              sm={8}
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: getColor(theme, 'background'),
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ padding: "2rem", backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: "8px" }}>
                  <Typography variant="h5" sx={{ fontStyle: "italic", textAlign: "center", color: getColor(theme, 'text') }}>
                    Realiza tu pago de manera segura
                  </Typography>
                </Box>
              </Box>
            </Grid> */}

{/* <h1>Generar QR para Transacción</h1>
      <QrCodeGenerator 
        walletDestino={transaccionData.walletDestino} 
        monto={transaccionData.monto}
        walletProviene={transaccionData.walletProviene}
        token={transaccionData.token}
        descripcion={transaccionData.descripcion}
      /> */}

          </Grid>
        </Box>
      );
    };
    

export default PaymentForm;

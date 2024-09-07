"use client";
import * as React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { alpha, useTheme } from '@mui/material/styles';

export default function Hero() {
  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },  // Responsivo: columna en pantallas pequeñas, fila en grandes
        alignItems: 'center',
        justifyContent: 'space-between',  // Separación equitativa entre texto e imagen
        paddingX: theme.spacing(4),  // Espaciado lateral
        paddingY: theme.spacing(4),
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: theme.palette.mode === 'light' ? '#000' : '#fff',
      }}
    >
      {/* Sección de Texto */}
      <Box
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', md: '500px' },
          textAlign: { xs: 'center', md: 'left' },  // Alineación centrada en pantallas pequeñas, a la izquierda en grandes
          paddingRight: { md: theme.spacing(4) },  
          marginLeft: { md: '150px' },  // Movemos el texto mucho más a la izquierda
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },  // Tamaño de fuente responsivo
            fontWeight: 'bold',
          }}
        >
          Optimiza tu empresa con cuentas empresariales
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' }, 
            marginBottom: theme.spacing(3),
            color: theme.palette.mode === 'light' ? '#555' : '#ddd',  // Mejor contraste para el subtítulo
          }}
        >
          Tu dinero puede crecer con tasas preferenciales y herramientas de gestión financiera avanzadas.
        </Typography>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            justifyContent: { xs: 'center', md: 'flex-start' },  // Centrado en pantallas pequeñas
          }}
        >
          <Button variant="contained" color="primary" size="large">
            Abrir Cuenta Empresarial
          </Button>
          <Button variant="outlined" color="secondary" size="large">
            Contactar Asesor
          </Button>
        </Stack>
      </Box>

      {/* Sección de Imagen */}
      <Box
        sx={{
          flex: 1,
          textAlign: 'center',
          paddingLeft: { md: theme.spacing(2) },  
          marginRight: { md: '-150px' },  // Movemos la imagen mucho más a la derecha
        }}
      >
        <Image
          alt="Building"
          src="/banco/build.png"  // Ruta de tu imagen
          width={450}
          height={550}
          priority
          style={{ maxWidth: '100%', height: 'auto' }}  // Ajuste responsivo
        />
      </Box>
    </Box>
  );
}

import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icono de check
import DiamondIcon from '@mui/icons-material/Diamond'; // Icono de diamante
import BoltIcon from '@mui/icons-material/Bolt'; // Icono de rayo
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';


export default function Features() {
    const theme = useTheme();
  const features = [
    {
      icon: <CheckCircleIcon sx={{ fontSize: 60}} />,
      title: 'Menores taxas',
      description: 'Possuímos parcerias com diversos bancos consolidados, garantindo para você as menores taxas de mercado.',
    },
    {
      icon: <DiamondIcon sx={{ fontSize: 60}} />,
      title: 'Tarifa única',
      description: 'Sem tarifas para emissão, alteração, manutenção e cancelamento de boleto. Pague somente por boletos liquidados.',
    },
    {
      icon: <BoltIcon sx={{ fontSize: 60}} />,
      title: 'Boleto híbrido',
      description: 'Além do código de barras padrão, é gerado um qrcode dinâmico para PIX, e o seu cliente decide como quer pagar.',
    },
  ];

  return (
    <Box sx={{ width: '100%', paddingY: 8, paddingX: 8, backgroundColor: getColor(theme,'background'), color:getColor(theme,'text') }}>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index} sx={{ textAlign: 'center' }}>
            {feature.icon}
            <Typography variant="h6" component="h3" sx={{ marginTop: 2 }}>
              {feature.title}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1,opacity: 0.8 }}>
              {feature.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

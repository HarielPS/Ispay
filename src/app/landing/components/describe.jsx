import * as React from 'react';
import { Box, Grid, Typography, Button, Paper } from '@mui/material';
import Image from 'next/image';
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';

export default function MarketingCampaign() {
  const theme = useTheme();
  return (
    // <Box sx={{ width: '100%', paddingY: 8, backgroundColor: '#1c1c2e', color: '#fff' }}>
    <Box sx={{ width: '100%', paddingY: 8}}>
      {/* Primera Sección - Texto y Dashboard */}
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Sección de Texto */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            We Create Impactful Marketing Campaigns that deliver results
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            MarTech isn't your average marketing agency – we're trailblazers in the blockchain and Web3 arena. Every client receives a full tracking dashboard and guaranteed performance improvement.
          </Typography>
          <Button variant="outlined" color="primary" sx={{ borderColor: '#fff', color: '#fff' }}>
            Get a Free Audit
          </Button>
        </Grid>

        {/* Sección de Imagen (Dashboard) */}
        <Grid item xs={12} md={6}>
          {/* <Paper sx={{ padding: 3, borderRadius: '40px', margin: 1, display: 'inline-block', background:getColor(theme,'accent') }}> */}
            <Image
              src="/landing/descript.jpg"
              alt="Dashboard Example"
              width={700}
              height={400}
              style={{ 
                borderRadius: '10px', 
                display: 'block', 
                border: `4px solid ${getColor(theme,'text')}`
              }}             
              />
          {/* </Paper> */}
        </Grid>

      </Grid>

      {/* Segunda Sección - Métricas */}
      <Box sx={{ marginTop: 8}}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={3}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              240+
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Partners Served
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              68%
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Improvement per Campaign
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              $12m
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Average Client Revenue
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              +98%
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Client Satisfaction Rate
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

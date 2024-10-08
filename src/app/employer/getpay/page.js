"use client"
import React from 'react'
import { Box, useTheme } from '@mui/material'
import getColor from '@/themes/colorUtils'
import PaymentForm from './components/pago';

export default function getPay() {
  const theme = useTheme();
  return (
    <Box sx={{background:getColor(theme,'background')}}>
      getPay
      <PaymentForm/>
    </Box>
  )
}

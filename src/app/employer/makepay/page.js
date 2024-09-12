"use client"
import React from 'react'
import { Box, useTheme } from '@mui/material'
import getColor from '@/themes/colorUtils'
import PaymentForm from './components/pago'

export default function Makepay() {
  const theme = useTheme();
  return (
    // getColor(theme,'background')
    <Box sx={{background:'red'}}>
      <PaymentForm/>
    </Box>
  )
}

"use client";
import React, { useState } from "react";
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';

export default function layout({ children }) {
  const theme = useTheme();
  return <div style={{ width: "100vw", overflow: "hidden", background:getColor(theme,'background') }}>{children}</div>;
}

"use client";
import React, { useState } from "react";

export default function layout({ children }) {
  return <div style={{ width: "100vw", overflow: "hidden" }}>{children}</div>;
}

"use client";
import React, { useState } from "react";
import MoonPayWidget from "./components/MoonPayWidget";
import { Box } from "@mui/material";

export default function deposit() {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const toggleWidget = () => {
    setIsWidgetVisible((prevState) => !prevState);
  };
  return (
    <div>
      <button onClick={toggleWidget}>
        {isWidgetVisible ? "Cerrar Widget" : "Mostrar Widget"}
      </button>
      {isWidgetVisible && <MoonPayWidget isVisible={isWidgetVisible} />}
      <div
        id="moonpay-widget-container"
        style={{ width: "100%", height: "500px", position: "relative" }}
      ></div>
    </div>
  );
}

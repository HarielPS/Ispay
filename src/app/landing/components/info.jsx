"use client";
import React, { useState } from "react";
import { Box, Button, Typography, Grid, Stack, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import getColor from '@/themes/colorUtils';


const contentData = {
  Freelancers: {
    title: "Manage your cash easily",
    description:
      "Lorem Ipsum is simply dummy text of the printing and the typesetting industry. Lorem Ipsum has been industry's standard dummy text ever since.",
    image: "/landing/banco/lap.jpg",
    alt: "Invoice for Freelancers",  // Texto alternativo
  },
  "SMBs & Startups": {
    title: "Grow your business smartly",
    description:
      "Manage all aspects of your startup or small business finances, from invoices to expenses. Take control of your cash flow with confidence.",
    image: "/images/invoice2.png",
    alt: "Invoice for SMBs & Startups",  // Texto alternativo
  },
  "Business Founders": {
    title: "Optimize your funding",
    description:
      "Get tools to manage your funding, investors, and financial performance. Easily send and manage invoices with full transparency.",
    image: "/images/invoice3.png",
    alt: "Invoice for Business Founders",  // Texto alternativo
  },
  "Micro businesses": {
    title: "Efficiently handle your payments",
    description:
      "Our platform is designed to streamline payment processes for micro businesses, ensuring that your cash flow is smooth and effective.",
    image: "/images/invoice4.png",
    alt: "Invoice for Micro Businesses",  // Texto alternativo
  },
};

export default function Info() {
  const [selectedTab, setSelectedTab] = useState("Freelancers");
  const [fadeIn, setFadeIn] = useState(true);
  const theme = useTheme();

  const handleTabChange = (tab) => {
    if (tab !== selectedTab) {
      setFadeIn(false); // Inicia la animación de salida
      setTimeout(() => {
        setSelectedTab(tab); // Cambia el contenido
        setFadeIn(true); // Inicia la animación de entrada
      }, 300); // El tiempo debe coincidir con el tiempo de salida
    }
  };

  const { title, description, image, alt } = contentData[selectedTab];

  return (
    // <Box sx={{ width: "100%", backgroundColor: "#111", color: "#fff", padding: 5 }}>
    <Box sx={{ width: "100%", backgroundColor: getColor(theme,'background2'), color: getColor(theme,'text'), padding: 5 }}>
      <Grid container spacing={2}>
        {/* Títulos de las secciones */}
        <Grid item xs={12}>
          <Stack direction="row" spacing={4} justifyContent="center">
            {Object.keys(contentData).map((tab) => (
              <Box key={tab}>
                <Button
                  variant="text"
                  onClick={() => handleTabChange(tab)}
                  sx={{
                    // color: selectedTab === tab ? "#fff" : "#ccc",
                    color: getColor(theme,'text'),
                    fontWeight: selectedTab === tab ? "bold" : "normal",
                    paddingBottom: 1,
                    borderBottom: selectedTab === tab ? `2px solid #007bff` : "none",
                    "&:hover": {
                    //   color: "#fff",
                    },
                    transition: "color 0.3s, border-bottom 0.3s",
                  }}
                >
                  {tab}
                </Button>
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Sección de Texto con Fade */}
        <Grid item xs={12} md={6}>
          <Fade in={fadeIn} timeout={{ enter: 600, exit: 300 }}>
            <Box
              sx={{
                textAlign: "left",
                padding: 4,
                minHeight: "350px",  // Altura mínima fija
                maxHeight: "350px",  // Fijamos la altura máxima
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",  // Centrar verticalmente
                overflow: "hidden",
              }}
            >
              <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold"}}>
                {title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {description}
              </Typography>
              {/* <Button variant="contained" color="primary" size="large" sx={{ marginTop: 3 }}>
                Get started now →
              </Button> */}
            </Box>
          </Fade>
        </Grid>

        {/* Sección de Imagen con Fade */}
        <Grid item xs={12} md={6}>
          <Fade in={fadeIn} timeout={{ enter: 600, exit: 300 }}>
            <Box
              sx={{
                textAlign: "center",
                minHeight: "350px",  // Altura mínima fija
                maxHeight: "350px",  // Fijamos la altura máxima
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",  // Alinear verticalmente
                overflow: "hidden",
              }}
            >
              <Image
                alt={alt}
                src={image}
                width={400}
                height={500}
                priority
                style={{ 
                    maxWidth: "100%", 
                    height: "auto", 
                    borderRadius: '10px', // Aplicamos directamente a la imagen
                    overflow: 'hidden',    // Aseguramos que el contenido se recorte si es necesario
                }}
                />
              {/* Mostrar el alt de la imagen */}
              {/* <Typography variant="caption" sx={{ marginTop: 2, color: "#ccc" }}>
                {alt}
              </Typography> */}
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}

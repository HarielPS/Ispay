"use client";
import React, { useState, useEffect, useRef } from "react";
import { AppBar, Toolbar, IconButton, Button, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';  
import ThemeToggle from "@/themes/ThemeToggle";
import getColor from "@/themes/colorUtils";
import HomeIcon from '@mui/icons-material/Home';  
import StarIcon from '@mui/icons-material/Star';  
import SearchIcon from '@mui/icons-material/Search';  
import BoltIcon from '@mui/icons-material/FlashOn';  
import ServerIcon from '@mui/icons-material/Dns';  
import PaletteIcon from '@mui/icons-material/Palette';  
import PencilIcon from '@mui/icons-material/Edit';  
import { useTheme } from "@mui/material/styles"; 
import Image from "next/image";

// Importando opciones para la navbar
import { any } from "./helpers/any.navbar";
import { company } from "./helpers/company.navbar";
import { signup } from "./helpers/signup.navbar";
import { employ } from "./helpers/employer.navbar";


export default function Navbar({ toggleTheme }) {
  const theme = useTheme(); 
  const router = useRouter();
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState([]);

  // Esta función hace scroll a una sección específica en la página
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChangeRoute = (route, sectionId) => {
    if (pathname === "/") {
      // Si estamos en la página principal, hacemos scroll a la sección
      handleScrollToSection(sectionId);
    } else {
      // Si no estamos en la página principal, navegamos a una nueva ruta
      router.push(route);
    }
  };

  // Función para obtener un ícono basado en el label
  const getIcon = (label) => {
    switch (label) {
      case "Home":
        return <HomeIcon sx={{ marginRight: 1 }} />;
      case "Features":
        return <StarIcon sx={{ marginRight: 1 }} />;
      case "Our Team":
        return <ServerIcon sx={{ marginRight: 1 }} />;
      case "Testimonials":
        return <SearchIcon sx={{ marginRight: 1 }} />;
      case "FAQs":
        return <PaletteIcon sx={{ marginRight: 1 }} />;
      case "Contact Us":
        return <PencilIcon sx={{ marginRight: 1 }} />;
      default:
        return null;
    }
  };

  // Mapear los ítems del menú para incluir el comportamiento correcto
  const mapItems = (items) => {
    return items.map((item) => ({
      ...item,
      command: () => handleChangeRoute(item.route, item.sectionId),  // Lógica para manejar el scroll o redireccionar
    }));
  };

  // Cargar la estructura correcta del menú basada en la ruta
  useEffect(() => {
    if (pathname === "/") {
      setMenuItems(mapItems(any)); // Cargamos el menú de 'any' para la página principal
    } else if (pathname.startsWith("/company")) {
      setMenuItems(mapItems(company)); 
    } else if (pathname.startsWith("/auth")) {
      setMenuItems(mapItems(signup));
    } else if (pathname.startsWith("/employer")) {
      setMenuItems(mapItems(employ));
    } else {
      setMenuItems(mapItems(any));
    }
  }, [pathname]);

  const appBarPosition = pathname === "/" ? "fixed" : "relative";
  const logoSrc = theme.palette.mode === 'light' ? '/logo_light.png' : '/logo_dark.png';

  return (
    <AppBar position={appBarPosition}
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        color: getColor(theme, 'text'),
      }}>
      <Toolbar
        variant="regular"
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(24px)',
          maxHeight: 70,  // Ajuste de altura máxima
          padding: '0 20px',  // Ajuste de padding para mantener espacio adecuado
        })}
      >
        {/* Logo */}
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => router.push('/')}>
          <Image
            alt="logo"
            src={logoSrc}
            height={80}
            width={80}
          />
        </IconButton>

        {/* Menú dinámico */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          {menuItems.map((item, index) => (
            <Button 
              key={index} 
              color="inherit" 
              onClick={item.command}
              startIcon={getIcon(item.label)}  // Añadimos los íconos correctos
              sx={{ textTransform: "none", fontWeight: 500 }}  // Asegúrate de que el texto del botón no esté en mayúsculas
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Lado derecho */}
        {pathname === "/" ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => router.push("/auth/signup")}>
              Registro
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => router.push("/auth/signin")}>
              Iniciar Sesión
            </Button>
            <ThemeToggle toggleTheme={toggleTheme} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <input
              type="text"
              placeholder="Buscar…"
              style={{ padding: '5px', borderRadius: '5px', borderColor: '#ccc' }}
            />
            <Avatar alt="user avatar" src="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" />
            <ThemeToggle toggleTheme={toggleTheme} />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

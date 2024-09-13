"use client";
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Button, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "@/themes/ThemeToggle";
import getColor from "@/themes/colorUtils";
import Image from "next/image";
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import ServerIcon from '@mui/icons-material/Dns';
import SearchIcon from '@mui/icons-material/Search';
import PaletteIcon from '@mui/icons-material/Palette';
import PencilIcon from '@mui/icons-material/Edit';
import { useTheme } from "@mui/material";

// Importando opciones para la navbar
import { any } from "./helpers/any.navbar";
import { company } from "./helpers/company.navbar";
import { signup } from "./helpers/signup.navbar";
import { employ } from "./helpers/employer.navbar";

// Importar Firestore y funciones para acceder a la base de datos
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "@/services/Firebase/Firebase";

export default function Navbar({ toggleTheme }) {
  const theme = useTheme(); 
  const router = useRouter();
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [img, setImg] = useState("");


  // Manejo del menú desplegable
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Esta función hace scroll a una sección específica en la página
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChangeRoute = (route, sectionId) => {
    if (pathname === "/") {
      handleScrollToSection(sectionId);
    } else {
      router.push(route);
    }
  };

  const handlelogout = () => {
    // Cierra el menú antes de hacer cualquier otra cosa
    handleCloseMenu();
    
    // Limpia el localStorage
    localStorage.clear();
    console.log("Cerrando sesión y limpiando localStorage...");
    
    // Redirige al usuario a la página principal
    router.push("/");
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

  const mapItems = (items) => {
    return items.map((item) => ({
      ...item,
      command: () => handleChangeRoute(item.route, item.sectionId),
    }));
  };

  useEffect(() => {
    if (pathname === "/") {
      setMenuItems(mapItems(any));
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

  useEffect(() => {
    const userUID = localStorage.getItem("userUID");
    const dataCompany = JSON.parse(localStorage.getItem("dataCompany"));

    if (userUID && dataCompany?.ID_company_tax) {
      const ID_company_tax = dataCompany.ID_company_tax;

      // Buscar el documento del usuario en Firestore
      const fetchUserImage = async () => {
        try {
          const userDocRef = doc(db, "EMPRESAS", ID_company_tax, "USUARIO", userUID);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.image) {
              setImg(userData.image); 
            }
          } else {
            console.log("El documento del usuario no existe.");
          }
        } catch (error) {
          console.error("Error al recuperar la imagen del usuario:", error);
        }
      };

      fetchUserImage(); 
    }
  }, []);

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
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(24px)',
          maxHeight: 70,  
          padding: '0 20px',
        }}
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
              startIcon={getIcon(item.label)}  
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Lado derecho con avatar y menú desplegable */}
        {(pathname.startsWith("/company") || pathname.startsWith("/employer")) ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{display:'flex', alignItems:'center'}}>
              <IconButton onClick={handleAvatarClick}>
                <Avatar alt="user avatar" src={img || "/path/to/default-avatar.png"}  />
              </IconButton>
              <ThemeToggle toggleTheme={toggleTheme} />       
            </Box>
            {/* Menú desplegable */}
            <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleCloseMenu}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  PaperProps={{
    sx: {
      bgcolor: getColor(theme, 'background3'),  // Asegura el color de fondo del menú
      color: getColor(theme, 'text'),           // Asegura el color del texto en todo el menú
      borderRadius: 1,                          // Añade un borde redondeado si lo deseas
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',  // Añade un efecto de sombra si lo necesitas
    },
  }}
>
  <MenuItem
    onClick={handleCloseMenu}
    sx={{ 
      bgcolor: 'inherit', 
      color: 'inherit',
      '&:hover': {
        bgcolor: getColor(theme, 'background2'),
        // color: getColor(theme, 'contrastText'),
      },
    }}
  >
    Perfil
  </MenuItem>
  <MenuItem
    onClick={handlelogout}
    sx={{ 
      bgcolor: 'inherit', 
      color: 'inherit',
      '&:hover': {
        bgcolor: getColor(theme, 'background2'),
        // color: getColor(theme, 'contrastText'),
      },
    }}
  >
    Cerrar sesión
  </MenuItem>
</Menu>


          </Box>
        ) : (
          pathname === "/" && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={() => router.push("/auth/signup")}>
                Registro
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => router.push("/auth/signin")}>
                Iniciar Sesión
              </Button>
              <ThemeToggle toggleTheme={toggleTheme} />
            </Box>
          )
        )}
      </Toolbar>
    </AppBar>
  );
}

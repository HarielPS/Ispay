"use client";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/themes/ThemeToggle"; 
import { useTheme } from "@mui/material/styles"; 
import getColor from "@/themes/colorUtils";

// options on navbar
import { any } from "./helpers/any.navbar";
import { company } from "./helpers/company.navbar";
import { signup } from "./helpers/signup.navbar";

export default function Navbar({ toggleTheme }) { 
  const theme = useTheme(); 
  const router = useRouter();
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState([]);

  const handleChangeRoute = (route) => {
    if (pathname) {
      router.push(route);
    }
  };

  const mapItems = (items, handleChangeRoute) => {
    return items.map((item) => {
      if (item.items) {
        return {
          ...item,
          items: mapItems(item.items, handleChangeRoute),
        };
      }
      return {
        ...item,
        command: item.route
          ? () => handleChangeRoute(item.route)
          : item.command,
      };
    });
  };

  useEffect(() => {
    if (pathname) {
      switch (true) {
        case pathname === "/":
          setMenuItems(mapItems(any, handleChangeRoute));
          break;
        case pathname.startsWith("/company"):
          setMenuItems(mapItems(company, handleChangeRoute));
          break;
        case pathname.startsWith("/auth"):
          setMenuItems(mapItems(signup, handleChangeRoute));
          break;
        default:
          setMenuItems(mapItems(any, handleChangeRoute));
          break;
      }
    }
  }, [pathname]);

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    />
  );

  const endDefault = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
        style={{
          // backgroundColor: getColor(theme, 'background'),
          // color: getColor(theme, 'text')
          background:'#d3d3d3',
          color:'black',
        }}
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  // primary: '#a08b23',  // Amarillo dorado -> puede usarse para botones de advertencia o alertas, ya que el color atrae la atención de inmediato.
  //   secondary: '#d3d3d3',  // Gris claro       -> puede ser un color de fondo suave para áreas secundarias.
  //   accent: '#04388b',  // Azul oscuro -rey      -> podría ser el color principal para botones de acción, ya que denota energía y positividad
  //   background: '#ffffff',  // Blanco          -> Fondo
  //   text: '#333333',  // Gris oscuro           -> Texto

  const endHome = (
    <div className="flex align-items-center gap-2">
      <Button
        label="Registro"
        icon="pi pi-user-plus"
        className="p-button-success"
        onClick={() => router.push("/auth/register")}
        style={{
          // backgroundColor: getColor(theme, 'accent'),
          background:'#04388b',
          color: 'white'
        }}
      />
      <Button
        label="Iniciar Sesión"
        icon="pi pi-sign-in"
        className="p-button-info"
        onClick={() => router.push("/auth/login")}
        style={{
          // backgroundColor: getColor(theme, 'secondary'),
          background:'#d3d3d3',
          color:'black',
          // color: getColor(theme, 'text')
        }}
      />
      <ThemeToggle toggleTheme={toggleTheme} />
    </div>
  );

  return (
    <div 
      className="custom-navbar" 
      style={{
        overflow: "hidden",
        width: "100vw",
        backgroundColor: `${getColor(theme, 'background')} !important`,
        color: `${getColor(theme, 'text')} !important`,
        // borderBottom: `1px solid ${getColor(theme, 'shadow')} !important`,
    }}>
      <div className="card" style={{ width: "100%", position: "absolute" }}>
        <Menubar model={menuItems} start={start} end={pathname === "/" ? endHome : endDefault} />
      </div>
    </div>
  );
}

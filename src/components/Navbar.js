"use client";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { usePathname } from "next/navigation"; 

// options on navbar
import { any } from "./helpers/any.navbar";
import { company } from "./helpers/company.navbar";

export default function Navbar() {
  const pathname = usePathname(); 
  const [menuItems, setMenuItems] = useState([]);

  const handleChangeRoute = (route) => {
    if (pathname) {
      window.location.href = route; 
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
      console.log("ruta actual:", pathname);

      if (pathname === "/") {
        setMenuItems(mapItems(any, handleChangeRoute));
      } else if (pathname.startsWith("/company")) {
        setMenuItems(mapItems(company, handleChangeRoute));
      } else {
        setMenuItems(mapItems(any, handleChangeRoute));
      }
    } else {
      console.log("pathname no disponible aún");
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

  const end = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <div className="card" style={{ width: '100%', position: 'absolute' }}>
        <Menubar model={menuItems} start={start} end={end} />
      </div>
    </div>
  );
}

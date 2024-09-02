"use client";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { useRouter } from "next/navigation";

//options on navbar
import { any } from "./helpers/any.navbar";
import { company } from "./helpers/company.navbar";


export default function Navbar() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState([]);
  const handleChangeRoute = (route) => {
    router.push(route);
  };
  const mapItems = (items, handleChangeRoute) => {
    return items.map((item) => {
      if (item.items) {
        // Si el item tiene sub-items, recursivamente aplica el mapeo
        return {
          ...item,
          items: mapItems(item.items, handleChangeRoute),
        };
      }
      // Si el item tiene una ruta, agrega el command
      return {
        ...item,
        command: item.route
          ? () => handleChangeRoute(item.route)
          : item.command,
      };
    });
  };

  useEffect(()=> {console.log("ruta:" + router.pathname)},[])
  useEffect(() => {
    switch (router.pathname) {
      case "/":
        setMenuItems(mapItems(any, handleChangeRoute));
        break;
      case "/company":
        setMenuItems(mapItems(company, handleChangeRoute));
        break;
      default:
        setMenuItems(mapItems(any, handleChangeRoute));
        break;
    }
  }, [router.pathname]);

  /* const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  ); */

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
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
      <div className="card">
        <Menubar model={menuItems} start={start} end={end} />
      </div>
    </div>
  );
}

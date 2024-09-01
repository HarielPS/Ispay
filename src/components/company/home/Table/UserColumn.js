import React from "react";

export default function UserColumn(option) {
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt={option.name}
        src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`}
        width="32"
      />
      <span>{option.name}</span>
    </div>
  );
}

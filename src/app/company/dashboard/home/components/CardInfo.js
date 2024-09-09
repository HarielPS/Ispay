"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';

export default function CardInfoInicio({
  title,
  numPrin,
  icon,
  numText,
  text,
  link,
  color,
}) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Tooltip title={text} arrow>
      {/* <div className="col-12 md:col-6 lg:col-2" onClick={()=> router.push(link)}> */}
      <div className="col-4 sm:col-4 md:col-4 lg:col-4">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round min-h-full" 
        // sx={{background:getColor(theme,'background'),boxShadow: `1px 1px 9px 10px ${getColor(theme, 'shadow')}`}}
        >
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">{title}</span>
              <div className="text-900 font-medium text-xl">
                <div className="flex align-items-center gap-2" style={{ minWidth:"14rem", maxWidth:"21rem" }}>
                  <span
                    variant="subtitle"
                    style={{
                      maxWidth: "fit-content",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {numPrin}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`flex align-items-center justify-content-center ${
                color ? color : "bg-blue-100"
              } border-round`}
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i
                className={`pi ${icon} ${
                  color ? "text-white" : "text-blue-500"
                } text-xl`}
              ></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">{numText}</span>
          {/* <span className="text-500">{text}</span> */}
        </div>
      </div>
    </Tooltip>
  );
}

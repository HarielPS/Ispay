"use client"
import { Inter } from "next/font/google";
//import "./globals.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { AuthProvider } from "@/utils/Auth.context";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getColor from "@/themes/colorUtils";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
//navbar
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";
import { useState, useMemo } from "react";
import zIndex from "@mui/material/styles/zIndex";
const inter = Inter({ subsets: ["latin"] });


// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// Definir los temas claro y oscuro
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#ffd700' },
    secondary: { main: '#d3d3d3' },
    background: { default: '#ffffff', paper: '#f5f5f5' },
    text: { primary: '#333333', secondary: '#757575' },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2c1357' },
    secondary: { main: '#5b3fc4' },
    background: { default: '#000000', paper: '#303030' },
    text: { primary: '#ffffff', secondary: '#bdbdbd' },
  },
});

export default function RootLayout({ children }) {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => {
    const palette = {
      mode: mode,
      primary: {
        main: getColor({ palette: { mode } }, 'primary'),
      },
      secondary: {
        main: getColor({ palette: { mode } }, 'secondary'),
      },
      background: {
        default: getColor({ palette: { mode } }, 'background'),
        paper: getColor({ palette: { mode } }, 'accent'), 
      },
      text: {
        primary: getColor({ palette: { mode } }, 'text'),
        secondary: getColor({ palette: { mode } }, 'shadow'),
      },
    };

    return createTheme({ palette });
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')); // Alternar entre tema claro y oscuro
  };
  const value = {
    zIndex: {
        modal: 1100,    // dialog, sidebar
        overlay: 1000,  // dropdown, overlaypanel
        menu: 1000,     // overlay menus
        tooltip: 1100,   // tooltip
        toast: 1200     // toast
    },
    autoZIndex: true,
};
  return (
    <PrimeReactProvider value={value}>
      <AuthProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body
            className={inter.className}
            style={{
              margin: 0,
              padding: 0,
              height: "100vh",
              width: "100vw",
              overflowX: "hidden",
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary
            }}
          >
            {/* <Box style={{position:'relative', zIndex:3, marginTop:0}}> */}
              <Navbar toggleTheme={toggleTheme}/>
            {/* </Box> */}
            <Box 
            sx={{
                marginTop:'80px', 
                // backgroundColor: theme.palette.background.paper,
                minHeight: 'calc(100vh - 80px)',
                color: theme.palette.text.primary,
            }}>
              {children}
            </Box>
          </body>
        </html>
        </ThemeProvider>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

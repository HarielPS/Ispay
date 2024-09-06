import { Inter } from "next/font/google";
//import "./globals.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { AuthProvider } from "@/utils/Auth.context";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./flag.css"
//navbar
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
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
        <html lang="en">
          <body
            className={inter.className}
            style={{
              margin: 0,
              padding: 0,
              height: "100vh",
              width: "100vw",
              overflowX: "hidden",
              // background:'blue'
            }}
          >
            {/* <Box style={{position:'relative', zIndex:3, marginTop:0}}> */}
              <Navbar/>
            {/* </Box> */}
            <Box sx={{marginTop:'80px'}}>
              {children}
            </Box>
          </body>
        </html>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Fade,
} from "@mui/material";
import Image from "next/image";
import { Google as GoogleIcon, Apple as AppleIcon } from "@mui/icons-material";
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';
import { FBQueries } from "@/services/Firebase/Firebase.queries";
import { useRouter } from "next/navigation";

const frases = [
  { "text": "La planificación financiera es el arte de proyectar el futuro en cifras, y los negocios son el arte de convertir esas cifras en realidad.", "author": "Anónimo" },
  { "text": "El dinero es una herramienta, no un objetivo. Usarlo sabiamente define el éxito en cualquier empresa.", "author": "Anónimo" },
  { "text": "No se trata de tener mucho dinero, sino de gestionar bien lo que tienes.", "author": "Robert Kiyosaki" },
  { "text": "El éxito financiero de una empresa depende tanto de su capacidad para generar ingresos como de su habilidad para gestionar riesgos.", "author": "Anónimo" },
  { "text": "Gestionar el dinero correctamente hoy es la clave para alcanzar el éxito empresarial mañana.", "author": "Anónimo" },
  { "text": "La disciplina financiera es la mejor inversión para asegurar la sostenibilidad de una empresa.", "author": "Anónimo" },
  { "text": "La eficiencia financiera no es una opción, es una necesidad en un mundo empresarial en constante cambio.", "author": "Anónimo" },
  { "text": "En los negocios, lo que importa no es cuánto ganas, sino cuánto conservas y cómo haces que ese dinero trabaje para ti.", "author": "Robert Kiyosaki" },
  { "text": "El éxito de una empresa se mide no solo por sus ingresos, sino por la salud de sus finanzas.", "author": "Anónimo" },
  { "text": "Innovación y tecnología financiera son las bases para una gestión eficiente y rentable en la era digital.", "author": "Anónimo" }
];


const Login = () => {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Para mostrar mensajes de error
  const [success, setSuccess] = useState(false); // Para redirección si el login es exitoso
  const [currentFrase, setCurrentFrase] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [fraseIndex, setFraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const escribirFrase = (frase, author, index = 0) => {
      setCurrentFrase(frase.slice(0, index + 1)); // Evitar acumulación de caracteres
      if (index < frase.length - 1) {
        setTimeout(() => escribirFrase(frase, author, index + 1), 100);
      } else {
        setTimeout(() => {
          setCurrentAuthor(author);
          setTimeout(() => {
            setVisible(false); // Oculta la frase actual
            setTimeout(() => {
              setCurrentFrase("");
              setCurrentAuthor("");
              setFraseIndex((prevIndex) => (prevIndex + 1) % frases.length); // Cambia de frase
              setVisible(true); // Muestra la nueva frase
            }, 1000); // Tiempo de desvanecimiento
          }, 5000); // 5 segundos
        }, 500);
      }
    };

    escribirFrase(frases[fraseIndex].text, frases[fraseIndex].author);
  }, [fraseIndex]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    try {
      // 1. Llamar a la función de Firebase para iniciar sesión
      const response = await FBQueries.Login(email, password);

      if (response.success) {
        const user = response.user;

        // 2. Obtener el rol del usuario desde Firestore
        const roleResponse = await FBQueries.GetUserRole(response.user.uid);

        if (roleResponse.success) {
          const userRole = roleResponse.role;

          // 3. Redirigir según el rol
          if (userRole === "true") {
            router.push("/company/dashboard/home"); // Redirigir al dashboard de admin
          } else {
            router.push("/employer/makepay"); // Redirigir al dashboard de usuario
          }
        } else {
          setError(roleResponse.message);
        }
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", backgroundColor: getColor(theme, 'background') }}>
      <Grid container component="main" sx={{ height: "100vh",backgroundColor: getColor(theme, 'background') }}>
        {/* imagen */}
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: getColor(theme, 'background')
          }}
        >
          <Image
            src="/signin/log.jpeg"
            alt="Imagen"
            layout="fill"
            objectFit="cover"
          />

          {/* Fondo semitransparente sobre la imagen */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Columna para la frase (centrada sobre la imagen) */}
            <Fade in={visible}>
              <Box sx={{ padding: "2rem", backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: "8px" }}>
                <Typography variant="h5" sx={{ fontStyle: "italic", textAlign: "center", color: getColor(theme, 'text') }}>
                  {currentFrase}
                </Typography>
                {currentAuthor && (
                  <Typography variant="subtitle1" sx={{ textAlign: "center", marginTop: "1rem", color: getColor(theme, 'text') }}>
                    - {currentAuthor}
                  </Typography>
                )}
              </Box>
            </Fade>
          </Box>
        </Grid>

        {/* Columna para el formulario (1/3 de la pantalla) */}
        <Grid
          item
          xs={12}
          sm={4}
          component={Paper}
          elevation={6}
          square
          sx={{ backgroundColor: getColor(theme, 'background'), padding: "2rem", borderRadius: "0", height: "100vh" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
              Iniciar Sesión
            </Typography>

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                Iniciar Sesión
              </Button>
            </form>

            <Typography align="center" sx={{ mt: 3, color:getColor(theme, 'text')}}>
              ¿No tienes una cuenta?{" "}
              <Button href="/auth/signup" sx={{ color: getColor(theme, 'primary') }}>
                Regístrate
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

// colorUtils.js
import { useTheme } from '@mui/material/styles';

const getColor = (theme, colorName) => {
  // Define both dark and light mode palettes
// azul =007bff ambos

  const darkPalette = {
    primary: '#a08b23',  // Amarillo dorado -> puede usarse para botones de advertencia o alertas, ya que el color atrae la atención de inmediato.
    secondary: '#007bff', // azul rey         ->funcionaría bien para botones de acción o enlaces importantes.
    accent: '#2c83b9',  // Azul claro         ->es un buen color para formularios o elementos secundarios, ya que transmite calma y claridad.
    background: '#000000',  // Negro          -> Fondo 
    background2: '#111', //                -> Fondo algo distinto
    text: '#ffffff',  // Blanco               -> Texto
    both:'#007bff' // azul -> ambos modos 
  };

  const lightPalette = {
    primary: '#2c1357',  // Morado oscuro     -> encabezados o fondos importantes
    secondary: '#111',  // Gris claro   '#d3d3d3'    -> puede ser un color de fondo suave para áreas secundarias.
    accent: '#04388b',  // Azul oscuro -rey      -> podría ser el color principal para botones de acción, ya que denota energía y positividad
    background: '#ffffff',  // Blanco          -> Fondo
    background2: '#d9d9d9', //                -> Fondo algo distinto
    text: '#333333',  // Gris oscuro           -> Texto
    both:'#007bff' // azul -> ambos modos 
  };

  // Switch between palettes based on theme mode
  const customColors = theme.palette.mode === 'dark' ? darkPalette : lightPalette;

  // Add shadow color handling
  customColors.shadow = theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)';

  // Return the requested color, or fallback to theme's default background
  return customColors[colorName] || theme.palette.background.paper;
};

export default getColor;

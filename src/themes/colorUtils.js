// colorUtils.js
import { useTheme } from '@mui/material/styles';

const getColor = (theme, colorName) => {
  // Define both dark and light mode palettes
  const darkPalette = {
    primary: '#2c1357',  // Morado oscuro     -> encabezados o fondos importantes
    secondary: '#5b3fc4', // Morado brillante ->funcionaría bien para botones de acción o enlaces importantes.
    accent: '#2c83b9',  // Azul claro         ->es un buen color para formularios o elementos secundarios, ya que transmite calma y claridad.
    background: '#000000',  // Negro          -> Fondo 
    text: '#ffffff',  // Blanco               -> Texto
  };

  const lightPalette = {
    primary: '#a08b23',  // Amarillo dorado -> puede usarse para botones de advertencia o alertas, ya que el color atrae la atención de inmediato.
    secondary: '#d3d3d3',  // Gris claro       -> puede ser un color de fondo suave para áreas secundarias.
    accent: '#04388b',  // Azul oscuro -rey      -> podría ser el color principal para botones de acción, ya que denota energía y positividad
    background: '#ffffff',  // Blanco          -> Fondo
    text: '#333333',  // Gris oscuro           -> Texto
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

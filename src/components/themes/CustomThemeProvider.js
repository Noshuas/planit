import React, { useState } from 'react';
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Theme from './theme';

// Create a theme instance.

const colors = {
  light: {
    primary: { main: '#fff' },
    background: { default: '#cac4ce' },
  },
  dark: {
    primary: { main: '#000' },
    secondary: { main: '#5e5e5e' },
    // background: { default: '#333333' }
  },
  red: {
    primary: { main: '#c92d39' },
    background: { default: '#fbd8e2' },
  },
  orange: {
    primary: { main: '#ef8d22' },
    background: { default: '#faebd7' },
  },
  yellow: {
    primary: { main: '#e5b53b' },
    background: { default: '#fff6d6' },
  },
  green: {
    primary: { main: '#488a12' },
    background: { default: '#e2fbcd' },
  },
  blue: {
    primary: { main: '#4262c2' },
    background: { default: '#d9effb' },
  },
  violet: {
    primary: { main: '#834187' },
    background: { default: '#f4e3f5' },
  },
};

const CustomThemeProvider = ({ children }) => {
  const [color, setColor] = useState('violet');

  const theme = createTheme(adaptV4Theme({
    spacing: 8,
    palette: {
      ...colors[color],
      error: { main: red.A400 },
    },
  }));

  theme.props = {
    MuiTextField: { size: 'small' },
    MuiButton: { color: 'primary' },
  };

  theme.overrides = {
    MuiCardMedia: {
      root: {
        height: '150px',
        postion: 'absolute',
      },
    },
    MuiTextField: {
      root: {
        margin: '10px',
      },
    },
    MuiButton: {
      root: {
        marginTop: '1em',
      },
    },
  };

  return (
    <Theme.Provider value={{ setColor }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </Theme.Provider>
  );
};

export default CustomThemeProvider;

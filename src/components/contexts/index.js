/*
  import contextProvider
  import each context

  export all;

*/
import React, { createContext, useState } from 'react';
import ThemeContext from './themeContext';
import SessionContext from './sessionContext';
import theme from '../Theme';

// we nee the ThemeContext.Provider to be able to update
// themes dynamically
const contextProvider = () => (



  <ThemeContext.Provider value={{ setColor }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
  </ThemeContext.Provider>
);
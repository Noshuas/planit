import { createContext, useEffect } from 'react';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Account from '../accountContext';
import { Session } from 'express-session';


/* example use
 useContext(themeUpdator)('blue');
 Or:
 const reTheme = useContext(themeUpdator)
 reTheme('blue')
 reTheme('red')

*/

let [ theme, updateTheme ] = useState('violet');
const themeUpdator = createContext((colorString)=>{
  updateTheme(colorString)
});





//Account context
<Session.Provider value={this needs to update to trigger a reRender}>
  <Theme.Provider value={this needs to update to trigger a reRender}>
    <ThemeProvider theme={needs a themeObject from createTheme}>
      {children}
    </ThemeProvider>
  </Theme.Provider>
</Account.Provider>

/*
example child component

const Layout = (props) => {
  {setStyles, updateStyles} = useStyles(Theme);
  {setSession, updateSession} = useContext(Session);

  return (
    <div>
      ...layout stuff
    </div>
  )
}

*/
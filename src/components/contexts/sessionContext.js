import React, { createContext, useState } from 'react';
import Cookie from 'js-cookie';

const Session = createContext({});

const SessionProvider = ({ children }) => {
  // sets up the cookie state which will be passed as context
  const [ cookie, setCookie ] = useState();
  const [ theme, updateTheme ] = 'violet';

  // on page render, set cookie state
  React.useEffect(() => {
    // This method updates cookie state
    const updateCookies = (currentTheme) => {
      setCookie({
        name: Cookie.get('name'),
        email: Cookie.get('email'),
        'logged-in': Cookie.get('logged-in'),
        theme: theme,
        update: updateCookies,
      });
    };

    if (cookie['logged-in'] === undefined) {
      updateCookies();
    }
  }, [cookie]);

  return (
    <Session.Provider value={cookie}>
      {children}
    </Session.Provider>
  );
};

export default SessionProvider;

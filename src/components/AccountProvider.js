import React, { createContext, useState } from 'react';
import Cookie from 'js-cookie';
import Account from '../accountContext';

const AccountProvider = function ({ children }) {
  // sets up the cookie state which will be passed as context
  const [cookie, setCookie] = useState({});

  // on page render, set cookie state
  React.useEffect(() => {
    // This method updates cookie state
    const updateCookies = () => {
      console.log(Cookie.get());
      setCookie({
        name: Cookie.get('name'),
        email: Cookie.get('email'),
        'logged-in': Cookie.get('logged-in'),
        update: updateCookies,
      });
    };

    console.log(cookie);
    if (cookie['logged-in'] === undefined) {
      updateCookies();
    }
  }, [cookie]);

  return (
    <Account.provider value={cookie}>
      {children}
    </Account.provider>
  );
};

export default AccountProvider;

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '/Users/xavier/bloomtech/Final/asylum-rg-fe-starter/src/styles/styles.css';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="login-logout-profile"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;

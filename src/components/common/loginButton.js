import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '/Users/xavier/bloomtech/Final/asylum-rg-fe-starter/src/styles/styles.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="login-logout-profile"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;

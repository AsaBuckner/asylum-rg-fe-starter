import React from 'react';
import '/Users/xavier/bloomtech/Final/asylum-rg-fe-starter/src/styles/styles.css';
import { Link } from 'react-router-dom';

const ProfileButton = () => {
  return (
    <Link
      to="/profile"
      className="login-logout-profile"
      style={{ paddingLeft: '75px' }}
    >
      Profile
    </Link>
  );
};

export default ProfileButton;

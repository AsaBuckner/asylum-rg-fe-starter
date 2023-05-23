import React from 'react';
import Loading from './Loading';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import '/Users/xavier/bloomtech/Final/asylum-rg-fe-starter/src/styles/styles.css';

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email, locale, nickname, email_verified } = user;

  console.log(user);
  return (
    <div className="profileBase">
      <div className="profileBackground">
        <div className="imageDiv">
          <img src={picture} alt="profilePicture" className="" />
        </div>

        <div className="Info">
          <div className="Name">
            <h1>{name}</h1>
          </div>

          <div className="username">
            <h2>Username: </h2>
            <h3>{nickname}</h3>
          </div>

          <div className="email">
            <h2>Email: </h2>
            <h3>{email}</h3>
          </div>

          <div className="Language">
            <h2>Language: </h2>
            <h3>{locale == 'en' ? 'English' : 'Spanish'}</h3>
          </div>

          <div className="Verified">
            <h2>Account Verified</h2>
            <h3>{email_verified ? '✅' : '❌'}</h3>
          </div>
        </div>

        <div className="accountMessage"></div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});

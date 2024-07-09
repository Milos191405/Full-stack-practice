/* eslint-disable no-unused-vars */
import React from "react";
import { GoogleLogout } from "react-google-login";

const Logout = () => {
  const onSuccess = () => {
    localStorage.clear();
    console.log("Log out made successfully!");
  };

  const clienId = import.meta.env.VITE_CLIENTID;

  return (
    <div>
      <GoogleLogout
        clientId={clienId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;

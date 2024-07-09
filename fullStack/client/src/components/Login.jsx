/* eslint-disable no-unused-vars */
import React from "react";
import { GoogleLogin } from "react-google-login";

const Login = () => {
  const onSuccess = (res) => {
    //console.log(res);
    //alert(`Welcome ${res.profileObj.name}`);
    localStorage.setItem("profile", JSON.stringify({ res }));
  };

  const onFailure = (res) => {
    console.log("Error: ", res);
  };

  const clienId = import.meta.env.VITE_CLIENTID;

  return (
    <div>
      <GoogleLogin
        clientId={clienId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default Login;

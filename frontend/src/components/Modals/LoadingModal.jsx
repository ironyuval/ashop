import Logo from "../../assets/logo.png";
import React from "react";
import "./LoadingModal.css";

export const LoadingModal = () => {
  return (
    <div className="d-flex h-100 position-relative">
      <div className="m-auto" tabIndex="-1" role="dialog">
        <div className="container d-flex flex-column align-items-center">
          <img src={Logo} className="rotate" />
          <span style={{ position: "absolute", bottom: 0 }}>is loading...</span>
        </div>
      </div>
    </div>
  );
};

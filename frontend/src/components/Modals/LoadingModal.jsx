import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

export const LoadingModal = () => {
  const isLoading = useSelector((state) => state.app.isLoading);

  if (!isLoading) return null;
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );
};

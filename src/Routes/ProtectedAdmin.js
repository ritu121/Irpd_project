
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  console.log("Token in protected",token);
  return token ? (
    <>
      {children}
    </>
  ) : (
    <Navigate to="/permission" replace state={{ path: location.pathname }} />
  );
}

export default ProtectedAdmin;

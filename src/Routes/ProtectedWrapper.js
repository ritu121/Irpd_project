
import React from "react";
import { Navigate, useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
function ProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return(
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  )
  // return token ? (
  //   <div>
  //       {children}
  //   </div>  
  // ) : (
    
  // );
}

export default ProtectedWrapper;

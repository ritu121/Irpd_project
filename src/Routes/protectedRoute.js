import React,{useEffect,useState} from "react";
import { Navigate, useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
function ProtectedRoute({ permission = '', children }) {
  const type = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem('permissions'))

  
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const location = useLocation();

  useEffect(() => {
    if(type === 'user'){
        let res = permissions.includes(permission) ? true : false;
        setIsAuthenticated(res)
    }
  },[])
 
  return isAuthenticated ? (
    <>
        {children}
    </>
  ) : (
    <Navigate to="/protect" replace state={{ path: location.pathname }} />
  );
}

export default ProtectedRoute;

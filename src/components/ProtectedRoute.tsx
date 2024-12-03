import { PropsWithChildren, useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Navigate, useLocation } from "react-router-dom";

//this broke everything. It seems that on refresh. 
function ProtectedRoute({ children }: PropsWithChildren) {
  const location = useLocation();
  console.log(location.pathname, 'location'); 
  const context = useContext(AuthContext); 
  if (context?.loading) {
    return <div>Loading...</div>;
  }
  return context?.user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default ProtectedRoute


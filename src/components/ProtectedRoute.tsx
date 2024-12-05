import { PropsWithChildren, useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

//this broke everything. It seems that on refresh. 
function ProtectedRoute({ children }: PropsWithChildren) {
  const location = useLocation();
  const context = useContext(AuthContext); 
  if (context?.loading) {
    return <Loading />
  }
  return context?.user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default ProtectedRoute


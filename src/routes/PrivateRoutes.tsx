import { Navigate, useLocation } from "react-router-dom";
import Layout from "./Layout";
import useTokenStore from "../store/TokenStore";

export default function PrivateRoutes() {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

  const location = useLocation();

  console.log(location.pathname);

  if (tokenResponse.idUser > 0) {
    return <Layout />;
  } else {
    return <Navigate to="/login" state={{ destino: location.pathname }} />;
  }
}

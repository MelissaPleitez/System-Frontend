import { Outlet, Navigate } from "react-router-dom";
import { authStore } from "../Store/authStore";

interface Props {
  isAllowed: boolean;
  children?: React.ReactNode;
}

const PrivateLayout = ({ isAllowed, children }: Props) => {
  if (!isAllowed) return <Navigate to="/" />;

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateLayout;

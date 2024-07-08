import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../authRelated/Authcontext";

const Protectedroute = ({ children }) => {
  const { user } = UserAuth();

  if (user && !user) {
    return <Navigate to="*" />;
  } else {
    return children;
  }
};

export default Protectedroute;

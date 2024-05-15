import React from "react";
import { useNavigate } from "react-router-dom";

const withRouter = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} router={{ navigate }} />;
  };
};

export default withRouter;

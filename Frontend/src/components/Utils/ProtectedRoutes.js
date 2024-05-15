import React from "react";
import { Navigate, Outlet } from "react-router-dom";

class ProtectedRoutes extends React.Component {
  constructor(props) {
    super(props);
    const { isLoggedIn } = this.props; // Destructure isLoggedIn prop
    this.state = { isLoggedIn }; // Store it in component state (optional)
  }
  render() {
    const { isLoggedIn } = this.state;
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;

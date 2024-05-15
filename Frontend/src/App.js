import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./components/Pages/SignupPage"; // Assuming RegistrationForm is in a components folder
import LoginPage from "./components/Pages/LoginPage";
import HomePage from "./components/Pages/HomePage";
import ProfilePage from "./components/Pages/ProfilePage";
import EditProfile from "./components/Pages/EditProfile";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userId: null,
      username: "",
      isEditing: false,
    };
  }

  setIsLoggedIn = (isLoggedIn) => {
    this.setState({ isLoggedIn });
  };

  setUserIdAndUsername = (userId, username) => {
    this.setState({ userId: userId, username: username });
  };

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleSaveClick = () => {
    this.setState({ isEditing: false });
    console.log(this.state.isEditing);
  };

  handleCancelClick = () => {
    this.setState({ isEditing: false });
    console.log(this.state.isEditing);
  };

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <LoginPage setUserIdAndUsername={this.setUserIdAndUsername} />
            }
          />
          <Route path="/register" element={<SignupPage />} />
          <Route
            path="/home"
            element={<HomePage userId={this.state.userId} />}
          />

          <Route
            path="/:username"
            element={
              <ProfilePage
                userId={this.state.userId}
                isEditing={this.state.isEditing}
                onEditClick={this.handleEditClick}
                onSave={this.handleSaveClick}
                onCancel={this.handleCancelClick}
              />
            }
          />
          <Route
            path="/:username/edit"
            element={
              <EditProfile
                userId={this.state.userId}
                onSave={this.handleSaveClick}
                onCancel={this.handleCancelClick}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

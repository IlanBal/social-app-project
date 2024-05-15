import "../UI/SignupPage.css";

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import withRouter from "../Utils/CustomWithRouter";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      errorMessage: "",
      errorColor: "",
      errorTextShadow: "",
      isSubmitDisabled: true,
    };
  }

  checkFormValidity = () => {
    const { username, email, password, repeatPassword } = this.state;
    const isAllFieldsFilled = username && email && password && repeatPassword;
    this.setState({ isSubmitDisabled: !isAllFieldsFilled }); // Update submit button disabled state
  };

  handleInputChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value },
      this.checkFormValidity
    );
  };

  submitRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        repeatPassword: this.state.repeatPassword,
      });
      if (response.status === 200) {
        const message = response.data;
        this.setState({
          errorMessage: message,
          errorColor: "green",
          errorTextShadow: "0px 0px 3px rgba(0, 255, 0, 0.5)",
        });
        setTimeout(() => {
          this.props.router.navigate("/login"); // Or use useNavigate for functional components
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response.data || "";
      this.setState({
        errorMessage: errorMessage,
        errorColor: "red",
        errorTextShadow: "0px 0px 3px rgba(255, 0, 0, 0.6)",
      });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      repeatPassword,
      errorMessage,
      errorColor,
      errorTextShadow,
      isSubmitDisabled,
    } = this.state;
    return (
      <div className="register-form">
        <div className="register-form-wrapper">
          <div className="register-form-box">
            <h1>Sign up</h1>
            <span
              id="error-message"
              className="error-message"
              style={{
                color: errorColor,
                textShadow: errorTextShadow,
              }}
            >
              {errorMessage}
            </span>
            <form onSubmit={this.submitRegister}>
              <div className="form-input-group">
                <span className="icon">
                  <ion-icon name="person"></ion-icon>
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={this.handleInputChange}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="form-input-group">
                <span className="icon">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={this.handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-input-group">
                <span className="icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.handleInputChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-input-group">
                <span className="icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  type="password"
                  name="repeatPassword"
                  id="repeatPassword"
                  value={repeatPassword}
                  onChange={this.handleInputChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div className="button-box">
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="btn"
                >
                  Continue
                </button>
              </div>
              <div className="login-link">
                <p>
                  Already have an account? <Link to="/login">Sign in!</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupPage);

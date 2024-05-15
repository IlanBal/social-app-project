import "../UI/LoginPage.css";
import { Link } from "react-router-dom";
import React from "react";
import withRouter from "../Utils/CustomWithRouter";
import AuthService from "../Utils/AuthService";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      errorColor: "",
      errorTextShadow: "",
      isSubmitDisabled: true,
    };
  }

  checkFormValidity = () => {
    const { username, password } = this.state;
    const isAllFieldsFilled = username && password;
    this.setState({ isSubmitDisabled: !isAllFieldsFilled }); // Update submit button disabled state
  };

  handleInputChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value },
      this.checkFormValidity
    );
  };

  handleCheckboxChange = (e) => {
    const passwordInput = document.querySelector("#password");
    e.target.checked
      ? passwordInput.setAttribute("type", "text")
      : passwordInput.setAttribute("type", "password");
  };

  submitLogin = async (event) => {
    event.preventDefault();
    const authService = new AuthService();
    try {
      const response = await authService.login({
        username: this.state.username,
        password: this.state.password,
      });
      const loginResponse = response.data;
      if (loginResponse.user_id != null) {
        this.setState({
          errorMessage: "Login successfully!",
          errorColor: "green",
          errorTextShadow: "0px 0px 3px rgba(0, 255, 0, 0.5)",
        });
        //this.props.setIsLoggedIn(true);
        this.props.setUserIdAndUsername(
          loginResponse.user_id,
          this.state.username
        );
        setTimeout(() => {
          this.props.router.navigate("/home");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      this.setState({
        errorMessage: "Invalid username or password",
        errorColor: "red",
        errorTextShadow: "0px 0px 3px rgba(255, 0, 0, 0.6)",
      });
    }
  };

  render() {
    const {
      username,
      password,
      errorMessage,
      errorColor,
      errorTextShadow,
      isSubmitDisabled,
    } = this.state;
    return (
      <div className="login-form">
        <div className="login-form-wrapper">
          <div className="login-form-box">
            <h1>Login</h1>
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
            <form onSubmit={this.submitLogin}>
              <div className="form-input-group">
                <span>
                  <ion-icon name="person"></ion-icon>
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={this.handleInputChange}
                  placeholder="Username or email"
                  required
                />
              </div>
              <div className="form-input-group">
                <span>
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
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={this.handleCheckboxChange}
                />
                <label for="checkbox"> Show password</label>
                <Link
                  to="/forgot-password"
                  id="forgot-password"
                  className="forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="button-box">
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="btn"
                >
                  Log in
                </button>
                <Link className="register-link" to={"/register"}>
                  <button type="button" className="btn">
                    Sign up
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);

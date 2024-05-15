import "../UI/Login-Signup.css";
import "../UI/PasswordPage.css";

import { Link } from "react-router-dom";

function PasswordPage(props) {
  return (
    <div className="container password">
      <div className="form-box" id="password">
        <h1 className="password-title">Request New Password</h1>
        <form className="form" id="password-form">
          <div className="form-input-group">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="text"
              className="form-input"
              placeholder="Email"
              required
            />
            <div className="email-message"></div>
          </div>

          <div className="form-input-group">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              required
            />
            <div className="pass-error-message"></div>
          </div>

          <div className="form-input-group">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm Password"
              required
            />
            <div className="pass-error-message"></div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn">
              Verify
            </button>
          </div>
          <div className="password-signup">
            <p>
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                id="linkPassword"
                className="form-link-signup"
              >
                Sign up!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordPage;

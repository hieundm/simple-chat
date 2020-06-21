import React from "react";
import { signIn } from "../../services/auth";
import { Card, Col, Row } from "react-bootstrap";
import "./index.css";

const LoginForm = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const onChange = {
    email: (event) => {
      const { value } = event.target;

      setFormData((prevData) => {
        return {
          ...prevData,
          email: value,
        };
      });
    },
    password: (event) => {
      const { value } = event.target;

      setFormData((prevData) => {
        return {
          ...prevData,
          password: value,
        };
      });
    },
  };

  return (
    <div className="py-5 login-form">
      <div className="login-form__wrapper">
        <Card className="shadow-sm">
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="login-form__big-icon">
                  <img
                    src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
                    alt="123"
                  />
                </div>
              </Col>
              <Col md={6}>
                <h3>Member Login</h3>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(event) => onChange.email(event)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(event) => onChange.password(event)}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="login-form__button-sign-in"
                    onClick={() => signIn(formData.email, formData.password)}
                  >
                    Login
                  </button>
                </div>
                <div className="login-form__forgot-text">
                  <span className="txt1">Forgot</span>{" "}
                  <a className="txt2" href="#">
                    Password?
                  </a>
                </div>
                <div className="login-form__create-account">
                  <a className="txt2" href="#">
                    Create your Account
                  </a>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;

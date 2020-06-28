"use strict";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/Account";

const ForgotPassword = (_) => {
  const [formData, setFormData] = React.useState({
    email: "",
    newPassword: "",
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
    newPassword: (event) => {
      const { value } = event.target;

      setFormData((prevData) => {
        return {
          ...prevData,
          newPassword: value,
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
                <h3>Forgot password</h3>
                <div className="form-group">
                  <div className="prepend">
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(event) => onChange.email(event)}
                  />
                </div>
                <div className="form-group">
                  <div className="prepend">
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    onChange={(event) => onChange.newPassword(event)}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="login-form__button-sign-in"
                    onClick={() =>
                      forgotPassword(formData.email, formData.newPassword)
                    }
                  >
                    Submit
                  </button>
                </div>
                <div className="login-form__forgot-text">
                  <span className="txt1">Have an account,</span>{" "}
                  <Link className="txt2" to="/login">
                    login?
                  </Link>
                </div>
                <div className="login-form__create-account">
                  <Link to="/register" className="txt2">
                    Create your Account
                  </Link>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;

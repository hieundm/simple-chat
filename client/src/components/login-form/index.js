import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import LoginForm from './login-form';
import ForgotPasswordForm from './forgot-password-form'
import "./index.css";

const LoginForm = ({ isForgotPassword }) => {
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
                <Body></Body>
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

const Body = () => {
  if (isForgotPassword === true) {
    return <LoginForm></LoginForm>
  }

  return <ForgotPasswordForm></ForgotPasswordForm>
}


export default LoginForm;

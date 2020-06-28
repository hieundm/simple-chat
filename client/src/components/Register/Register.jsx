"use strict";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { register as sign_up } from "../../services/Account";
import { notify } from "../../helpers/Toast";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const isSuccess = await sign_up(data);

    if (isSuccess === true) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h3>Register</h3>
                  <div className="form-group">
                    <div className="prepend">
                      <i className="fas fa-user"></i>
                    </div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      ref={register}
                    />
                  </div>
                  <div className="form-group">
                    <div className="prepend">
                      <i className="fas fa-id-card"></i>
                    </div>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="Your first name"
                      ref={register}
                    />
                  </div>
                  <div className="form-group">
                    <div className="prepend">
                      <i className="fas fa-id-card"></i>
                    </div>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Your last name"
                      ref={register}
                    />
                  </div>
                  <div className="form-group">
                    <div className="prepend">
                      <i className="fas fa-lock"></i>
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      ref={register}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="login-form__button-sign-in"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="login-form__forgot-text">
                  <span className="txt1">Forgot</span>{" "}
                  <Link className="txt2" to="/forgot-password">
                    Password?
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

export default Login;

import React from 'react'
import { signIn } from "../../services/auth";

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
        <React.Fragment>
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
        </React.Fragment>
    );
};

export default LoginForm;
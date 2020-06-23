import React, { useState } from "react";
import { forgotPassword } from "../../services/auth";

const ForgotPasswordForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        newPassword: ""
    });

    const onChange = {
        email: (event) => {
            const { value } = event.target;

            setFormData(prevData => ({
                ...prevData,
                email: value
            }));
        }
        ,
        newPassword: (event) => {
            const { value } = event.target;

            setFormData(prevData => ({
                ...prevData,
                newPassword: value
            }));
        }
    }

    return (
        <React.Fragment>
            <h3>Forgot password</h3>
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
                    placeholder="Enter new password"
                    onChange={(event) => onChange.newPassword(event)}
                />
            </div>
            <div className="form-group">
                <button
                    className="login-form__button-sign-in"
                    onClick={() => forgotPassword(formData.email, formData.newPassword)}
                >
                    Submit
                  </button>
            </div>
        </React.Fragment>
    );
}

export default ForgotPasswordForm;
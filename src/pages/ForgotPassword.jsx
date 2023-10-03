import React, { useState } from "react";

import "../assets/styles/pages/ForgotPassword.scss";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "../schemas";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  // -------------------------STATE-----------------------------------------
  const [passwordSent, setPasswordSent] = useState(false);

  // -------------------------SUBMISSION OF THE FORM DATA-----------------------------------------
  const submitHandler = (formData) => {
    setPasswordSent(true);
  };

  // -------------------------FORM VALIDATION-----------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  // ================================================================================================
  if (!passwordSent)
    return (
      <section className="forgot-page">
        {/* -------------------LEFT CONTAINER---------------------------- */}
        <div className="left-container">
          <div className="left-container_top">
            <p className="left-container_top__heading">Reset your password</p>
            <p className="left-container_top__subheading">
              Enter your email address in the field provided to reset your
              password
            </p>
          </div>
        </div>

        {/* -------------------RIGHT CONTAINER---------------------------- */}
        <div className="right-container">
          <form
            method="post"
            className="right-container_form"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className={`input-group ${errors.email && "error"}`}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="on"
                placeholder="Enter your email address"
                {...register("email")}
              />
              {errors.email && (
                <span>
                  <BiErrorCircle /> {errors.email?.message}
                </span>
              )}
            </div>

            <div className="right-container_form__submit--btns">
              <button type="submit" className="login_btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    );

  if (passwordSent)
    return (
      <section className="sent-container">
        <p className="heading">Reset Password</p>
        <p className="sub_heading">
          We sent a link to ryan@gm***.com. Please click the link in your email
          to reset your password.
        </p>
        <Link to="/login" className="login_btn">
          Back to log in
        </Link>
      </section>
    );
};

export default ForgotPassword;

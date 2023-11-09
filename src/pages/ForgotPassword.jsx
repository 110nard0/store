import React, { useEffect, useMemo, useState } from "react";

import "@asset/pages/ForgotPassword.scss";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "@schemas";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  // -------------------------STATE-----------------------------------------
  const [email, setEmail] = useState("");
  const [emailSplitted, setEmailSplitted] = useState("");
  const [passwordSent, setPasswordSent] = useState(false);

  useMemo(() => {
    const splittedEmail = email.split("@")[0].substring(0, 2);

    setEmailSplitted(splittedEmail);
  }, [email]);

  // -------------------------SUBMISSION OF THE FORM DATA-----------------------------------------
  const submitHandler = (formData) => {
    setEmail(formData.email);
  };

  // -------------------------FORM VALIDATION-----------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      setPasswordSent(true);
      reset();
    }
  }, [isSubmitSuccessful]);

  // ================================================================================================
  if (!passwordSent)
    return (
      <section className="forgot-page">
        {/* -------------------LEFT CONTAINER---------------------------- */}
        <div className="left-container">
          <div className="left-container_top">
            <h1 className="left-container_top__heading">Reset your password</h1>
            <h4 className="left-container_top__subheading">
              Enter your email address in the field provided to reset your
              password
            </h4>
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
        <h2 className="heading">Reset Password</h2>
        <h4 className="sub_heading">
          {/* We sent a link to {email.substring(0, email.length - 7)}***.com. */}
          We sent a link to {emailSplitted}***
          {email.substring(email.length - 9)}. Please click the link in your
          email to reset your password.
        </h4>
        <Link to="/login" className="login_btn">
          Back to log in
        </Link>
      </section>
    );
};

export default ForgotPassword;

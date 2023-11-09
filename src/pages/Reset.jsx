import React, { useEffect, useState } from "react";

import "@asset/pages/Reset.scss";
import { BsEyeSlash, BsEye, BsCheckCircle } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema } from "@schemas";
import { useNavigate } from "react-router";

const Reset = () => {
  // -------------------------NAVIGATION-----------------------------------------

  const navigate = useNavigate();

  // -------------------------SHOW AND HIDE STATES-----------------------------------------
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [showSucess, setShowSucess] = useState(false);

  // -------------------------SUBMISSION OF THE FORM DATA-----------------------------------------
  const submitHandler = (formData) => {
    // console.log(formData);
  };

  // -------------------------FORM VALIDATION-----------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      setShowSucess(true);
      reset();

      setTimeout(() => {
        setShowSucess(false);
        navigate("/login");
      }, 3000);
    }
  }, [isSubmitSuccessful]);

  // ================================================================================================
  return (
    <section className="reset-page">
      {showSucess && (
        <div className="success-container">
          <BsCheckCircle />
          <h4>Password reset successful</h4>
        </div>
      )}
      <div className="reset-page_container">
        {/* -------------------LEFT CONTAINER---------------------------- */}
        <div className="left-container">
          <div className="left-container_top">
            <h2 className="left-container_top__heading">Reset your password</h2>
            <h4 className="left-container_top__sub-heading">
              Fill the spaces provided to reset or change your password.
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
            <div className={`input-group ${errors.password && "error"}`}>
              <label htmlFor="password">New Password</label>
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="off"
                placeholder="Enter new password"
                {...register("password")}
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !showPassword.password,
                  }))
                }
                className="eye-icon"
              >
                {showPassword.password ? <BsEyeSlash /> : <BsEye />}
              </span>

              {errors.password && (
                <span>
                  <BiErrorCircle /> {errors.password?.message}
                </span>
              )}
            </div>

            <div className={`input-group ${errors.confirmPassword && "error"}`}>
              <label htmlFor="confirmPassword">Password</label>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="off"
                placeholder="Confirm new password"
                {...register("confirmPassword")}
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !showPassword.confirmPassword,
                  }))
                }
                className="eye-icon"
              >
                {showPassword.confirmPassword ? <BsEyeSlash /> : <BsEye />}
              </span>

              {errors.confirmPassword && (
                <span>
                  <BiErrorCircle /> {errors.confirmPassword?.message}
                </span>
              )}
            </div>

            <button type="submit" className="reset_btn">
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reset;

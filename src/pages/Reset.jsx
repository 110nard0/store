import React, { useState } from "react";

import "../assets/styles/pages/Reset.scss";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema } from "../schemas";
import { useNavigate } from "react-router";

const Reset = () => {
  // -------------------------NAVIGATION-----------------------------------------

  const navigate = useNavigate();

  // -------------------------SHOW AND HIDE PASSWORD-----------------------------------------
  const [showPassword, setShowPassword] = useState(false);

  // -------------------------SUBMISSION OF THE FORM DATA-----------------------------------------
  const submitHandler = (formData) => {
    // console.log(formData);
    navigate("/");
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

  // ================================================================================================
  return (
    <section className="reset-page">
      {/* -------------------LEFT CONTAINER---------------------------- */}
      <div className="left-container">
        <div className="left-container_top">
          <p className="left-container_top__heading">Reset your password</p>
          <p className="left-container_top__sub-heading">
            Fill the spaces provided to reset or change your password.
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
          <div className={`input-group ${errors.password && "error"}`}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Enter your email password"
              {...register("password")}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </span>

            {errors.password && (
              <span>
                <BiErrorCircle /> {errors.password?.message}
              </span>
            )}
          </div>

          <div className={`input-group ${errors.password && "error"}`}>
            <label htmlFor="confirmPassword">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              placeholder="Enter your email password"
              {...register("confirmPassword")}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </span>

            {errors.password && (
              <span>
                <BiErrorCircle /> {errors.confirmPassword?.message}
              </span>
            )}
          </div>

          <button type="submit" className="reset_btn">
            <a href="/reset">Reset password</a>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Reset;

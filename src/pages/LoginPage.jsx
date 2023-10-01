import React, { useState } from "react";

import "../assets/styles/pages/LoginPage.scss";
import { BsArrowUpRight, BsEye, BsGoogle, BsEyeSlash } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginShema } from "../schemas";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LoginPage = () => {
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
    resolver: zodResolver(loginShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ================================================================================================
  return (
    <section className="login-page">
      {/* -------------------LEFT CONTAINER---------------------------- */}
      <div className="left-container">
        <div className="left-container_top">
          <p className="left-container_top__heading">Log into your account</p>
        </div>
        <div className="left-container_bottom">
          <p>
            Don't have an account?
            <button type="button" className="register_link">
              <a href="/register">Create an account </a>
              <BsArrowUpRight />
            </button>
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

          <button type="button" className="forgot_btn">
            <Link to="/reset">Forget password?</Link>
          </button>

          <div className="right-container_form__submit--btns">
            <button type="submit" className="login_btn">
              Log in
            </button>
            <button type="button" className="google_btn">
              <BsGoogle /> <span>Sign in with Google</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;

import React, { useEffect, useState } from "react";

import "@asset/pages/LoginPage.scss";
import { BsArrowUpRight, BsEye, BsGoogle, BsEyeSlash } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@schemas";
import { Link } from "react-router-dom";
import InputGroup from "@components/InputGroup";
import { login } from "../services";

const LoginPage = () => {
  // HDR:-------------------------SHOW AND HIDE PASSWORD-----------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // HDR:-------------------------SUBMISSION OF THE FORM DATA-----------------------------------------
  const submitHandler = async (formData) => {
    try {
      const res = await login(formData);
      setLoginError("");
      if (res.status === 200) window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setLoginError(err.response.data.detail);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoginError("");
    }, 5000);
    () => clearTimeout(timer);
  }, [loginError]);

  // HDR:-------------------------FORM VALIDATION-----------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //HDR: ================================================================================================
  return (
    <section className="login-page">
      {/* -------------------LEFT CONTAINER---------------------------- */}
      <div className="left-container">
        <div className="left-container_top">
          <h2 className="left-container_top__heading">Log into your account</h2>
        </div>
        <div className="left-container_bottom">
          <h4>
            Don't have an account?
            <button type="button" className="register_link">
              <Link to="/register">Create an account </Link>
              <BsArrowUpRight />
            </button>
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
          {loginError && <em className="form_error">{loginError}</em>}
          <InputGroup
            type="email"
            id="email"
            name="email"
            autoComplete="on"
            placeholder="Enter your email address"
            title="Email Address"
            error={errors.email}
            errormessage={errors.email?.message}
            {...register("email")}
          />

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
            <Link to="/forgot-password">Forgot password?</Link>
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
